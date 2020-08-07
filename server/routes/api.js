import { Router } from 'express';
import { middlewares } from 'auth0-extension-express-tools';
import merge from 'deepmerge';

import config from '../lib/config';

export default (storage) => {
  // management api client initialization
  const managementApiClient = middlewares.managementApiClient({
    domain: config('AUTH0_DOMAIN'),
    clientId: config('AUTH0_CLIENT_ID'),
    clientSecret: config('AUTH0_CLIENT_SECRET')
  });

  const api = Router();

  // Allow end users to authenticate. End users authorization implemented in `/client/actions/auth.js`
  api.use(middlewares.authenticateUsers.optional({
    domain: config('AUTH0_DOMAIN'),
    audience: config('EXTENSION_CLIENT_ID'),
    credentialsRequired: false,
    onLoginSuccess: (req, res, next) => {
      // you can modify `req.user` object here
      return next();
    }
  }));

  // Allow dashboard admins to authenticate.
  api.use(middlewares.authenticateAdmins.optional({
    credentialsRequired: false,
    secret: config('EXTENSION_SECRET'),
    audience: 'urn:example-extension',
    baseUrl: config('PUBLIC_WT_URL'),
    onLoginSuccess: (req, res, next) => {
      // you can modify `req.user` object here
      return next();
    }
  }));

  // using managementApiClient middleware when needed
  api.get('/clients', managementApiClient, (req, res, next) => {
    req.auth0.clients.getAll()
      .then(result => res.json(result))
      .catch(err => next(err));
  });

  api.get('/depnotes', managementApiClient, (req, res, next) => {
    const maxDate = (dates) => new Date(Math.max.apply(null, dates.map(d => new Date(d))))
    const uniqueMerge = (destinationArray, sourceArray, options) => Array.from(new Set(destinationArray.concat(sourceArray)))
    /* this needs to use keys to collect similar logs, i.e. this is not the place to 
    / create well formed json for an api response.
    / for example this format will merge all logs for depnote.description, and beneath
    / that it will merege all logs with the same depnote.client_id, and
    / depnote.details.request.path
    */
    const depNoteShaper = (depnote) => (
      {
        [depnote.description]: {
          dates: [
            depnote.date
          ],
          details: {
            clients: {
              [depnote.client_id]: {
                [depnote.details.request.path]: {
                  ip_addresses: [depnote.details.request.ip],
                  user_agents: [depnote.details.request.userAgent],
                  request_dates: [depnote.date]
                }
              }
            }
          }
        }
      }
    )
    // these should eventually be sourced from a migrations api
    // maybe a nice stopgap would be an endpoint to provide this data so the extension doesn't need updating to add new projects
    const metadata = {
      "Management API Unpaginated Requests: This feature is being deprecated. Please see https://auth0.com/docs/migrations/guides/unpaginated-requests for more information.": {
        title: "Unpaginated Management API Requests",
        migration_window: "21 July 2020 - 21 Janurary 2021",
        migration_guide: "https://auth0.com/docs/migrations/guides/unpaginated-requests"
      },
      "ID token was used in making a management API call.  This behavior is deprecated. (https://auth0.com/docs/migrations/guides/calling-api-with-idtokens)": {
        title: "ID Tokens for Management API v2",
        migration_window: "Q4 2020 - Q4 2021",
        migration_guide: "https://auth0.com/docs/migrations/guides/calling-api-with-idtokens"
      }
    }
    // TODO needs to grab all the pages
    req.auth0.logs.getAll(
      {
        q: 'type: depnote',
        include_totals: true,
        per_page: 100
      }).then((result) => {
        var total = result.total
        var breakingChanges = result.logs.reduce(
          // reduces array of logs to a an object to collect all the related notes
          (acc, depnote) => merge(depNoteShaper(depnote), acc, {arrayMerge: uniqueMerge}),
          {}
        )
        // creates array of well formed json sumarizing breaking changes
        // it would be nice if the details only showed the last_request for each client/connection/etc
        res.json(Object.keys(breakingChanges).map((k) => (
          {
            title: metadata[k].title,
            description: k,
            last_request: maxDate(breakingChanges[k].dates),
            migration_window: metadata[k].migration_window,
            migration_guide: metadata[k].migration_guide,
            details: breakingChanges[k].details
          }
        )))
      }).catch(err => next(err));

  });

  api.get('/settings', (req, res, next) => {
    storage.read()
      .then(result => res.json(result))
      .catch(err => next(err));
  });

  api.post('/settings', (req, res, next) => {
    storage.read()
      .then(data => Object.assign({}, data, req.body.settings))
      .then(merged => storage.write(merged))
      .then(() => req.send(204))
      .catch(err => next(err));
  });

  return api;
}

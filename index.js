/*
* This files purpose is to run the extension locally
* It isn't a part of the extensions bundle
*/

const path = require('path');
const nconf = require('nconf');
const logger = require('./server/lib/logger');

require('@babel/register')({
  ignore: [/node_modules/],
  sourceMaps: !(process.env.NODE_ENV === 'production'),
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread'
  ],
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current'
      }
    }]
  ]
});

require('@babel/polyfill');

// Handle uncaught.
process.on('uncaughtException', (err) => {
  logger.error(err);
});

// Initialize configuration.
nconf
  .argv()
  .env()
  .file(path.join(__dirname, './server/config.json'))
  .defaults({
    NODE_ENV: 'development',
    HOSTING_ENV: 'default',
    PORT: 3001,
    WT_URL: 'http://localhost:3000'
  });

// Start the server.
console.log('index.js: starting server')
const app = require('./server').default((key) => nconf.get(key), null);
const port = nconf.get('PORT');

app.listen(port, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`Listening on http://localhost:${port}.`);
  }
});

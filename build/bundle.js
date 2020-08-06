"use strict";
module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var r=n(1),i=n(31).default,o=n(37);e.exports=r.createServer(function(e,t){return o.info("Starting Auth0 Example Extension - Version:","0.0.0"),i(e,t)})},function(e,t,n){const r=n(2),i=n(5),o=n(7),s=n(23);e.exports.createServer=r.createServer,e.exports.urlHelpers=i,e.exports.middlewares=o,e.exports.routes=s},function(e,t,n){const r=n(3),i=n(4);e.exports.createServer=function(e){const t=r.createServer(e);var n=null;return i.fromExpress(function(e,r){return n||(n=t(e.webtaskContext)),n(e,r)})}},function(e,t){e.exports=require("auth0-extension-tools@1.4.0")},function(e,t){e.exports=require("webtask-tools")},function(e,t,n){const r=n(6),i=3,o=2,s=1,a=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports.getBasePath=function(e){return t=e.originalUrl||"",n=e.path,(i=(i=r.parse(t).pathname||"").replace(n,"").replace(/^\/|\/$/g,"")).startsWith("/")||(i="/"+i),i.endsWith("/")||(i+="/"),i;var t,n,i},e.exports.getBaseUrl=function(e,t){var n=t;const i=r.parse(e.originalUrl||"").pathname||"";return r.format({protocol:n||"https",host:e.headers.host,pathname:i.replace(e.path,"").replace(/\/$/g,"")})},e.exports.getWebtaskUrl=function(e){const t=function(e){if(!e.container)return null;const t=e.container.replace(a,"\\$&"),n=e.jtn?e.jtn.replace(a,"\\$&"):"";if(e.url_format===s)return new RegExp("^/api/run/"+t+"/(?:"+n+"/?)?");if(e.url_format===o)return new RegExp("^/"+t+"/(?:"+n+"/?)?");if(e.url_format===i)return new RegExp("^/(?:"+n+"/?)?");throw new Error("Unsupported webtask URL format.")}(e.x_wt),n=e.url,c=e.url.replace(t,"/"),u=r.parse(c||"").pathname,l=e.x_wt&&e.x_wt.ectx&&e.x_wt.ectx.ISOLATED_DOMAIN||!1,d=r.parse(n||"").pathname||"";var p;if(l){p=r.format({protocol:"https",host:e.headers.host,pathname:d.replace(u,"").replace(/\/$/g,"")});const t=".it.auth0.com/api/run/"+e.x_wt.container+"/",n=function(e,t){if(!e)return null;const n=e.indexOf("sandbox8")>=0?"8":"";return"https://"+t+"."+(e.split(".it.auth0.com")[0].split("-")[1]||"us")+n+".webtask.io/"}(p,e.x_wt.container);p.indexOf(t)>=0&&(p=p.replace("https://"+e.headers.host+"/api/run/"+e.x_wt.container+"/",n))}else p=d;return p}},function(e,t){e.exports=require("url")},function(e,t,n){e.exports.authenticateAdmins=n(8),e.exports.authenticateUsers=n(16),e.exports.requireAuthentication=n(18),e.exports.errorHandler=n(19),e.exports.managementApiClient=n(20),e.exports.validateHookToken=n(21),e.exports.webtaskConfig=n(22)},function(e,t,n){const r=n(9),i=n(12),o=n(3),s=n(13);e.exports=function(e){if(!e||"object"!=typeof e)throw new o.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new o.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new o.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new o.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new o.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.baseUrl||void 0===e.baseUrl)throw new o.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new o.ArgumentError("The provided base URL is invalid: "+e.baseUrl);const t=i({audience:e.audience,issuer:e.baseUrl,secret:e.secret,algorithms:["HS256"],credentialsRequired:e.credentialsRequired||!0});return function(n,r,i){t(n,r,function(t){return t?i(t):e.onLoginSuccess?e.onLoginSuccess(n,r,i):i()})}},e.exports.optional=function(t){const n=e.exports(t);return s(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const n=r(e.headers.authorization.split(" ")[1]);return n&&n.iss===t.baseUrl}catch(e){return!1}return!1},n)}},function(e,t,n){"use strict";var r=n(10);function i(e){this.message=e}i.prototype=new Error,i.prototype.name="InvalidTokenError",e.exports=function(e,t){if("string"!=typeof e)throw new i("Invalid token specified");var n=!0===(t=t||{}).header?0:1;try{return JSON.parse(r(e.split(".")[n]))}catch(e){throw new i("Invalid token specified: "+e.message)}},e.exports.InvalidTokenError=i},function(e,t,n){var r=n(11);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}(t)}catch(e){return r(t)}}},function(e,t){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function r(e){this.message=e}r.prototype=new Error,r.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var i,o,s=0,a=0,c="";o=t.charAt(a++);~o&&(i=s%4?64*i+o:o,s++%4)?c+=String.fromCharCode(255&i>>(-2*s&6)):0)o=n.indexOf(o);return c}},function(e,t){e.exports=require("express-jwt@5.1.0")},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){return function(i,o,s){var a=r(s);return!0===e||"function"==typeof e&&e(i,o,a)?t(i,o,a):n?n(i,o,a):a()}}},function(e,t,n){var r=n(15);function i(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function o(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},n=e.name||"Function wrapped with `once`";return t.onceError=n+" shouldn't be called more than once",t.called=!1,t}e.exports=r(i),e.exports.strict=r(o),i.proto=i(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return i(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return o(this)},configurable:!0})})},function(e,t){e.exports=function e(t,n){if(t&&n)return e(t)(n);if("function"!=typeof t)throw new TypeError("need wrapper function");Object.keys(t).forEach(function(e){r[e]=t[e]});return r;function r(){for(var e=new Array(arguments.length),n=0;n<e.length;n++)e[n]=arguments[n];var r=t.apply(this,e),i=e[e.length-1];return"function"==typeof r&&r!==i&&Object.keys(i).forEach(function(e){r[e]=i[e]}),r}}},function(e,t,n){const r=n(9),i=n(12),o=n(17),s=n(3),a=n(13),c=n(3).UnauthorizedError;e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);const t=i({secret:o.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e.domain+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return e instanceof o.SigningKeyNotFoundError?t(new c("A token was provided with an invalid kid")):t(e)}}),audience:e.audience,issuer:"https://"+e.domain+"/",algorithms:["RS256"],credentialsRequired:e&&e.credentialsRequired||!0});return function(n,r,i){t(n,r,function(t){return t?i(t):e.onLoginSuccess?e.onLoginSuccess(n,r,i):i()})}},e.exports.optional=function(t){const n=e.exports(t);return a(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const n=r(e.headers.authorization.split(" ")[1]);return n&&n.iss==="https://"+t.domain+"/"}catch(e){return!1}return!1},n)}},function(e,t){e.exports=require("jwks-rsa@1.1.1")},function(e,t,n){const r=n(3).UnauthorizedError;e.exports=function(e,t,n){return e.user?n():n(new r("Authentication required for this endpoint."))}},function(e,t,n){e.exports=function(e){return function(t,n,r,i){return e&&e(t),t&&t.status?(r.status(t.status),r.json({error:t.code||t.name,message:t.message||t.name})):(r.status(t.status||500),r.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,n){const r=n(3);e.exports=function(e){return function(t,n,i){const o=t,s=t.user&&t.user.access_token&&t.user.access_token.length?{domain:e.domain,accessToken:t.user.access_token}:e;r.managementApi.getClient(s).then(function(e){return o.auth0=e,i(),null}).catch(function(e){i(e)})}}},function(e,t,n){const r=n(3);e.exports=function(e,t,n){if(null===e||void 0===e)throw new r.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new r.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new r.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new r.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===n||void 0===n)throw new r.ArgumentError("Must provide the extensionSecret");if("string"!=typeof n||0===n.length)throw new r.ArgumentError("The provided extensionSecret is invalid: "+n);return function(i){if(null===i||void 0===i)throw new r.ArgumentError("Must provide the hookPath");if("string"!=typeof i||0===i.length)throw new r.ArgumentError("The provided hookPath is invalid: "+i);return function(o,s,a){if(o.headers.authorization&&"Bearer"===o.headers.authorization.split(" ")[0]){const s=o.headers.authorization.split(" ")[1];try{if(r.validateHookToken(e,t,i,n,s))return a()}catch(e){return a(e)}}return a(new r.HookTokenError("Hook token missing for the call to: "+i))}}}},function(e,t,n){const r=n(3);e.exports=function(e){return function(t,n,i){return t.webtaskContext&&e.setProvider(r.configProvider.fromWebtaskContext(t.webtaskContext)),i()}}},function(e,t,n){e.exports.dashboardAdmins=n(24)},function(e,t,n){const r=n(25),i=n(26),o=n(27),s=n(30),a=n(3),c=n(5);e.exports=function(e){if(!e||"object"!=typeof e)throw new a.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new a.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new a.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new a.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new a.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.rta||void 0===e.rta)throw new a.ArgumentError("Must provide a valid rta");if("string"!=typeof e.rta||0===e.rta.length)throw new a.ArgumentError("The provided rta is invalid: "+e.rta);if(null===e.domain||void 0===e.domain)throw new a.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new a.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.baseUrl||void 0===e.baseUrl)throw new a.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new a.ArgumentError("The provided base URL is invalid: "+e.baseUrl);if(null===e.clientName||void 0===e.clientName)throw new a.ArgumentError("Must provide a valid client name");if("string"!=typeof e.clientName||0===e.clientName.length)throw new a.ArgumentError("The provided client name is invalid: "+e.clientName);const t=e.stateKey||"state",n=e.nonceKey||"nonce",u=e.urlPrefix||"",l=e.sessionStorageKey||"apiToken",d=r.Router();return d.get(u+"/login",function(r,o){const s=i.randomBytes(16).toString("hex"),l=i.randomBytes(16).toString("hex");o.cookie(t,s),o.cookie(n,l);const d=new a.SessionManager(e.rta,e.domain,e.baseUrl).createAuthorizeUrl({redirectUri:c.getBaseUrl(r)+u+"/login/callback",scopes:e.scopes,expiration:e.expiration,nonce:l,state:s});o.redirect(d)}),d.post(u+"/login/callback",o(),function(r,i,o){var u;try{u=s.decode(r.body.id_token)}catch(e){u=null}if(!u||!r.cookies||r.cookies[n]!==u.nonce)return o(new a.ValidationError("Login failed. Nonce mismatch."));if(!r.cookies||r.cookies[t]!==r.body.state)return o(new a.ValidationError("Login failed. State mismatch."));return new a.SessionManager(e.rta,e.domain,e.baseUrl).create(r.body.id_token,r.body.access_token,{secret:e.secret,issuer:e.baseUrl,audience:e.audience,noAccessToken:e.noAccessToken}).then(function(e){i.header("Content-Type","text/html"),i.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("'+l+'", "'+e+'");window.location.href = "'+c.getBaseUrl(r)+'";<\/script></head></html>')}).catch(function(e){o(e)})}),d.get(u+"/logout",function(t,n){const r=encodeURIComponent(c.getBaseUrl(t));n.header("Content-Type","text/html"),n.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("'+l+'");window.location.href = "https://'+e.rta+"/v2/logout/?returnTo="+r+"&client_id="+r+'";<\/script></head></html>')}),d.get("/.well-known/oauth2-client-configuration",function(t,n){n.header("Content-Type","application/json"),n.status(200).send({redirect_uris:[c.getBaseUrl(t)+u+"/login/callback"],client_name:e.clientName,post_logout_redirect_uris:[c.getBaseUrl(t)]})}),d}},function(e,t){e.exports=require("express@4.16.3")},function(e,t){e.exports=require("crypto")},function(e,t,n){"use strict";var r=n(28),i=n(29);function o(e){if("string"==typeof e&&"j:"===e.substr(0,2))try{return JSON.parse(e.slice(2))}catch(e){return}}function s(e){for(var t,n,r=Object.keys(e),i=0;i<r.length;i++)(n=o(e[t=r[i]]))&&(e[t]=n);return e}function a(e,t){if("string"==typeof e){if("s:"!==e.substr(0,2))return e;for(var n=!t||Array.isArray(t)?t||[]:[t],r=0;r<n.length;r++){var o=i.unsign(e.slice(2),n[r]);if(!1!==o)return o}return!1}}function c(e,t){for(var n,r,i,o=Object.keys(e),s=Object.create(null),c=0;c<o.length;c++)(i=e[r=o[c]])!==(n=a(i,t))&&(s[r]=n,delete e[r]);return s}e.exports=function(e,t){var n=!e||Array.isArray(e)?e||[]:[e];return function(e,i,o){if(e.cookies)return o();var a=e.headers.cookie;if(e.secret=n[0],e.cookies=Object.create(null),e.signedCookies=Object.create(null),!a)return o();e.cookies=r.parse(a,t),0!==n.length&&(e.signedCookies=c(e.cookies,n),e.signedCookies=s(e.signedCookies)),e.cookies=s(e.cookies),o()}},e.exports.JSONCookie=o,e.exports.JSONCookies=s,e.exports.signedCookie=a,e.exports.signedCookies=c},function(e,t,n){"use strict";t.parse=function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var n={},i=t||{},s=e.split(o),c=i.decode||r,u=0;u<s.length;u++){var l=s[u],d=l.indexOf("=");if(!(d<0)){var p=l.substr(0,d).trim(),f=l.substr(++d,l.length).trim();'"'==f[0]&&(f=f.slice(1,-1)),void 0==n[p]&&(n[p]=a(f,c))}}return n},t.serialize=function(e,t,n){var r=n||{},o=r.encode||i;if("function"!=typeof o)throw new TypeError("option encode is invalid");if(!s.test(e))throw new TypeError("argument name is invalid");var a=o(t);if(a&&!s.test(a))throw new TypeError("argument val is invalid");var c=e+"="+a;if(null!=r.maxAge){var u=r.maxAge-0;if(isNaN(u))throw new Error("maxAge should be a Number");c+="; Max-Age="+Math.floor(u)}if(r.domain){if(!s.test(r.domain))throw new TypeError("option domain is invalid");c+="; Domain="+r.domain}if(r.path){if(!s.test(r.path))throw new TypeError("option path is invalid");c+="; Path="+r.path}if(r.expires){if("function"!=typeof r.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+r.expires.toUTCString()}r.httpOnly&&(c+="; HttpOnly");r.secure&&(c+="; Secure");if(r.sameSite){var l="string"==typeof r.sameSite?r.sameSite.toLowerCase():r.sameSite;switch(l){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return c};var r=decodeURIComponent,i=encodeURIComponent,o=/; */,s=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function a(e,t){try{return t(e)}catch(t){return e}}},function(e,t,n){var r=n(26);function i(e){return r.createHash("sha1").update(e).digest("hex")}t.sign=function(e,t){if("string"!=typeof e)throw new TypeError("Cookie value must be provided as a string.");if("string"!=typeof t)throw new TypeError("Secret string must be provided.");return e+"."+r.createHmac("sha256",t).update(e).digest("base64").replace(/\=+$/,"")},t.unsign=function(e,n){if("string"!=typeof e)throw new TypeError("Signed cookie string must be provided.");if("string"!=typeof n)throw new TypeError("Secret string must be provided.");var r=e.slice(0,e.lastIndexOf("."));return i(t.sign(r,n))==i(e)&&r}},function(e,t){e.exports=require("jsonwebtoken@7.1.9")},function(e,t,n){"use strict";n.r(t),function(e){var r=n(32),i=n.n(r),o=n(25),s=n.n(o),a=n(3),c=n(1),u=n(33),l=n(36),d=n(39),p=n(41),f=n(35),h=n.n(f),g=n(37),m=n.n(g);t.default=function(t,n){h.a.setProvider(t);var r=n?new a.WebtaskStorageContext(n):new a.FileStorageContext(i.a.join(e,"./data.json")),o=new s.a;return o.use(c.routes.dashboardAdmins({secret:h()("EXTENSION_SECRET"),audience:"urn:example-extension",rta:h()("AUTH0_RTA").replace("https://",""),domain:h()("AUTH0_DOMAIN"),baseUrl:h()("PUBLIC_WT_URL"),webtaskUrl:h()("PUBLIC_WT_URL"),clientName:"Example Extension",sessionStorageKey:"example-extension:apiToken",noAccessToken:!0,urlPrefix:"/admins",scopes:"read:users"})),o.use("/api",Object(u.default)(r)),o.use("/app",s.a.static(i.a.join(e,"../dist"))),o.use("/meta",Object(d.default)()),o.use("/.extensions",Object(l.default)()),o.get("*",Object(p.default)()),o.use(c.middlewares.errorHandler(m.a.error.bind(m.a))),o}}.call(this,"/")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";n.r(t);var r=n(25),i=n(1),o=n(34),s=n.n(o),a=n(35),c=n.n(a);t.default=function(e){var t=i.middlewares.managementApiClient({domain:c()("AUTH0_DOMAIN"),clientId:c()("AUTH0_CLIENT_ID"),clientSecret:c()("AUTH0_CLIENT_SECRET")}),n=Object(r.Router)();return n.use(i.middlewares.authenticateUsers.optional({domain:c()("AUTH0_DOMAIN"),audience:c()("EXTENSION_CLIENT_ID"),credentialsRequired:!1,onLoginSuccess:function(e,t,n){return n()}})),n.use(i.middlewares.authenticateAdmins.optional({credentialsRequired:!1,secret:c()("EXTENSION_SECRET"),audience:"urn:example-extension",baseUrl:c()("PUBLIC_WT_URL"),onLoginSuccess:function(e,t,n){return n()}})),n.get("/clients",t,function(e,t,n){e.auth0.clients.getAll().then(function(e){return t.json(e)}).catch(function(e){return n(e)})}),n.get("/depnotes",t,function(e,t,n){var r={"Management API Unpaginated Requests: This feature is being deprecated. Please see https://auth0.com/docs/migrations/guides/unpaginated-requests for more information.":{title:"Unpaginated Management API Requests",migration_window:"21 July 2020 - 21 Janurary 2021",migration_guide:"https://auth0.com/docs/migrations/guides/unpaginated-requests"},"ID token was used in making a management API call.  This behavior is deprecated. (https://auth0.com/docs/migrations/guides/calling-api-with-idtokens)":{title:"ID Tokens for Management API v2",migration_window:"Q4 2020 - Q4 2021",migration_guide:"https://auth0.com/docs/migrations/guides/calling-api-with-idtokens"}};e.auth0.logs.getAll({q:"type: depnote",include_totals:!0,per_page:100}).then(function(e){e.total;var n=e.logs.reduce(function(e,t){return s()(function(e){return{[e.description]:{dates:[e.date],details:{clients:{[e.client_id]:{paths:[e.details.request.path]}}}}}}(t),e)},{});t.json(Object.keys(n).map(function(e){return{title:r[e].title,description:e,last_request:(t=n[e].dates,new Date(Math.max.apply(null,t.map(function(e){return new Date(e)})))),migration_window:r[e].migration_window,migration_guide:r[e].migration_guide,details:n[e].details};var t}))}).catch(function(e){return n(e)})}),n.get("/settings",function(t,n,r){e.read().then(function(e){return n.json(e)}).catch(function(e){return r(e)})}),n.post("/settings",function(t,n,r){e.read().then(function(e){return Object.assign({},e,t.body.settings)}).then(function(t){return e.write(t)}).then(function(){return t.send(204)}).catch(function(e){return r(e)})}),n}},function(e,t,n){"use strict";var r=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===i}(e)}(e)};var i="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function o(e,t){return!1!==t.clone&&t.isMergeableObject(e)?l((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function s(e,t,n){return e.concat(t).map(function(e){return o(e,n)})}function a(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return e.propertyIsEnumerable(t)}):[]}(e))}function c(e,t){try{return t in e}catch(e){return!1}}function u(e,t,n){var r={};return n.isMergeableObject(e)&&a(e).forEach(function(t){r[t]=o(e[t],n)}),a(t).forEach(function(i){(function(e,t){return c(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))})(e,i)||(c(e,i)&&n.isMergeableObject(t[i])?r[i]=function(e,t){if(!t.customMerge)return l;var n=t.customMerge(e);return"function"==typeof n?n:l}(i,n)(e[i],t[i],n):r[i]=o(t[i],n))}),r}function l(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||s,n.isMergeableObject=n.isMergeableObject||r,n.cloneUnlessOtherwiseSpecified=o;var i=Array.isArray(t);return i===Array.isArray(e)?i?n.arrayMerge(e,t,n):u(e,t,n):o(t,n)}l.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(e,n){return l(e,n,t)},{})};var d=l;e.exports=d},function(e,t,n){e.exports=n(3).config()},function(e,t,n){"use strict";n.r(t);var r=n(25),i=n(1),o=n(35),s=n.n(o),a=n(37),c=n.n(a);t.default=function(){var e=i.middlewares.validateHookToken(s()("AUTH0_DOMAIN"),s()("WT_URL"),s()("EXTENSION_SECRET")),t=Object(r.Router)();return t.use("/on-uninstall",e("/.extensions/on-uninstall")),t.use(i.middlewares.managementApiClient({domain:s()("AUTH0_DOMAIN"),clientId:s()("AUTH0_CLIENT_ID"),clientSecret:s()("AUTH0_CLIENT_SECRET")})),t.delete("/on-uninstall",function(e,t){c.a.debug("Uninstall running..."),e.auth0.clients.delete({client_id:s()("AUTH0_CLIENT_ID")}).then(function(){c.a.debug(`Deleted client: ${s()("AUTH0_CLIENT_ID")}`),t.sendStatus(204)}).catch(function(e){c.a.debug(`Error deleting client: ${s()("AUTH0_CLIENT_ID")}`),c.a.error(e),t.sendStatus(204)})}),t}},function(e,t,n){var r=n(38);r.emitErrs=!0;var i=new r.Logger({transports:[new r.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=i,e.exports.stream={write:function(e){i.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("winston@1.0.0")},function(e,t,n){"use strict";n.r(t);var r=n(25),i=n.n(r),o=n(40);t.default=function(){var e=i.a.Router();return e.get("/",function(e,t){t.status(200).send(o)}),e}},function(e){e.exports=JSON.parse('{"title":"Breaking Changes Dashboard","name":"auth0-breaking-changes-dashboard","version":"1.0.0","author":"auth0","useHashName":false,"description":"HackAuthon20 Breaking Changes Dashboard","type":"application","category":"end_user","logoUrl":"https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.png","initialUrlPath":"/","repository":"https://github.com/auth0/hackauth0n-20-depdash","codeUrl":"https://raw.githubusercontent.com/mmaddex/laze-quench-faro/master/build/bundle.js","keywords":["auth0","extension"],"auth0":{"createClient":true,"onUninstallPath":"/.extensions/on-uninstall","scopes":"read:clients delete:clients"},"secrets":{"EXTENSION_CLIENT_ID":{"description":"Text field with default value","default":"Sarcastic Snails","required":true}}}')},function(e,t,n){"use strict";n.r(t),function(e){n(42),n(43);var r=n(44),i=n.n(r),o=(n(32),n(1)),s=n(35),a=n.n(s);t.default=function(){var e='\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <title><%= config.TITLE %></title>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <link rel="shortcut icon" href="<%= assets.favIcon %>" />\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n      <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n      <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="<%= assets.cdnPath %>/auth0-example-extension.ui.<%= assets.version %>.css" /><% } %>\n    </head>\n    <body>\n      <div id="app"></div>\n      <script src="https://cdn.auth0.com/js/auth0/9.8.2/auth0.min.js"><\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n      <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n      <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"><\/script><% } %>\n      <% if (assets.app) { %><script type="text/javascript" src="/app/<%= assets.app %>"><\/script><% } %>\n      <% if (assets.version) { %>\n      <script type="text/javascript" src="<%= assets.cdnPath %>/auth0-example-extension.ui.vendors.<%= assets.version %>.js"><\/script>\n      <script type="text/javascript" src="<%= assets.cdnPath %>/auth0-example-extension.ui.<%= assets.version %>.js"><\/script>\n      <% } %>\n    </body>\n    </html>\n    ';return function(t,n,r){if(0===t.url.indexOf("/api"))return r();var s=o.urlHelpers.getBasePath(t),c={AUTH0_DOMAIN:a()("AUTH0_DOMAIN"),EXTENSION_CLIENT_ID:a()("EXTENSION_CLIENT_ID"),BASE_URL:o.urlHelpers.getBaseUrl(t),BASE_PATH:s,USER:a()("USERNAME"),TEAM:a()("TEAM")},u=a()("FAVICON_PATH")||"https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png",l=a()("CDN_PATH")||"//cdn.auth0.com/extensions/auth0-example-extension/assets";return n.send(i.a.render(e,{config:c,assets:{version:"0.0.0",cdnPath:l,favIcon:u}}))}}}.call(this,"/")},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("ejs@2.3.1")}]);
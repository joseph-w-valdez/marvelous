const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  // * Try to get the 'X-Access-Token' from the request headers.
  console.log('MIDDLEWARE', req);
  const token = req.get('X-Access-Token');
  console.log('TOKEN', token);
  // * If no token is provided, throw a 401 error with the message 'authentication required'
  if (!token) throw new ClientError(401, 'authentication required');
  // * Use jwt.verify() to verify the authenticity of the token and extract its payload
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) throw new ClientError(401, 'unauthorized request');
    // * Assign the extracted payload to the user property of the req object.
    else req.user = decoded;
    // * Call next() (with no arguments) to let Express know to advance to its next route or middleware.
    next();
  });
  /**
    * References:
    * https://expressjs.com/en/4x/api.html#req.get
    * https://nodejs.org/api/http.html#http_message_headers
    * https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    */
}

module.exports = authorizationMiddleware;

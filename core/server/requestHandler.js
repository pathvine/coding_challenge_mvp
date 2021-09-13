/* -------------------------------------------------------------------------- */
// This module handles all the requests coming to this app.
/* -------------------------------------------------------------------------- */
const http = require ('http'),
      fs = require ('fs'),
      layout = require ('./layout.js'),
      { getContentType } = require ('./contentType.js'),
      { routes, notFoundRoute } = require ('../routes/routes.js'); // Import the routes.

function requestHandler (req, res) {
  /* ------------------------------------------------------------------------ */
  // Begin: Compose and send response to the client.
  // Determine whether the route is not found.
  let isNotFound = !routes.has (req.url),
  // Define the destination route.
      destRoute = !isNotFound ? routes.get (req.url) : notFoundRoute,
  // Get the response header content type based on the destination route's
  // file type.
      contentType = getContentType (destRoute),
      test = '/graphics/yellowstar.svg';

  // Setting the content type in the header to 'text/html'.
  res.setHeader ('Content-type', contentType);

  console.log (req.url, '=>', destRoute, 'content type: ' + contentType);

  // Intercepting the route and output the appropriate response to the client.
  switch (req.url) {
    default:
      fs.readFile (destRoute, (error, data) => {
        if (contentType === 'text/html') { res.write (layout.header); }

        if (error) {
          res.statusCode = 500;
          console.log (error);
          res.write (error);
        } else {
          res.statusCode = isNotFound ? 404 : 200;
          res.write (data);
        }

        if (contentType === 'text/html') { res.write (layout.footer); }
        res.end ();
      });
  }
  // End: Compose and send response to the client.
  /* ------------------------------------------------------------------------ */

}

module.exports = {
  requestHandler: requestHandler
};

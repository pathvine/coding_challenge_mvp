/* -------------------------------------------------------------------------- */
// This module handles all the requests coming to this app.
/* -------------------------------------------------------------------------- */
const fs = require ('fs'),
      { getContentType } = require ('./contentType.js'),
      { postRoutes, notFoundRoute } = require ('../routes/routes.js'), // Import the routes.
      { updateReviews } = require ('./updateReviews.js');

function postRequestHandler (req, res) {
  /* ------------------------------------------------------------------------ */
  // Begin: Compose and send response to the client.
  // Define the destination route.
  let destRoute = postRoutes.has (req.url) ? postRoutes.get (req.url) : null,
  // Get the response header content type based on the destination route's
  // file type.
      contentType = getContentType (destRoute),
  // Define body to store the POST request body data.
      body = "",
  // Define reviewRecords to store the previous reviews from ./resources/reviews/reviews.json.
      reviewRecords;

  console.log (req.url, '=>', destRoute, 'content type: ' + contentType);

  // Intercepting the route and output the appropriate response to the client.
  switch (req.url) {
    case "/":
      req.on ("data", function (chunk) { body += chunk; });
      req.on ("end", function () {
        // Get the previous review records.
        reviewRecords = fs.readFileSync (destRoute, 'utf8');

        try {
          // Update the review records.
          reviewRecords = updateReviews (JSON.parse (reviewRecords), JSON.parse (body));
          
          // Write the updated review records back to the reviews.json.
          fs.writeFileSync (destRoute, JSON.stringify (reviewRecords));

          res.writeHead (200, {'Content-Type': 'application/json'});
          res.end (JSON.stringify (reviewRecords));
        } catch (error) {
          console.log (error.message);
          res.writeHead (415, {'Content-Type': 'text/plain'});
          res.end ((typeof error.message === "string") ? error.message : "Unsupported media type");
        }
      });
  }
  // End: Compose and send response to the client.
  /* ------------------------------------------------------------------------ */
}

module.exports = {
  postRequestHandler: postRequestHandler
};

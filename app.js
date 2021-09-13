const http = require ('http');
const fs = require ('fs');
const serverInternal = require ('./server/internal.js');

serverInternal.log ();

const server = http.createServer ((req, res) => {/* ------------------------------------------------------------------------ */
  // Begin: Compose and send response to the client.
  // Setting the content type in the header to 'text/html'.
  res.setHeader ('Content-type', 'text/html');

  // Intercepting the route and output the appropriate response to the client.
  switch (req.url) {
    case "/":
      fs.readFile ('./views/index.html', (error, data) => {
        if (error) {
          res.statusCode = 500;
          console.log (error);
        } else {
          res.statusCode = 200;
          res.write (data);
        }

        res.end ();
      });
    break;
    case "/reviews":
      fs.readFile ('./resources/reviews/reviews.json', (error, data) => {
        if (error) {
          res.statusCode = 500;
          console.log (error);
        } else {
          res.statusCode = 200;
          res.write (data);
        }

        res.end ();
      });
    break;
    default:
      fs.readFile ('./views/not-found.html', (error, data) => {
        if (error) {
          res.statusCode = 500;
          console.log (error);
        } else {
          res.statusCode = 404;
          res.write (data);
        }

        res.end ();
      });
  }
  // End: Compose and send response to the client.
  /* ------------------------------------------------------------------------ */
});

server.listen (3000, 'localhost', () => {
  console.log ('Listening for request on port 3000');
});

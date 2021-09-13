const http = require ('http');
const { requestHandler } = require ('./core/server/requestHandler.js');

const server = http.createServer ((req, res) => {
  switch (req.method) {
    case "GET":
      requestHandler (req, res);
    break;
    case "POST":
      var body = "";

      req.on("data", function (chunk) { body += chunk; });

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end (JSON.stringify ({ testing: { testing: "testing123" }}));
    break;
  }
});

server.listen (3000, 'localhost', () => {
  console.log ('Coding challenge MVP started...');
});

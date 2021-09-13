const http = require ('http');
const { getRequestHandler } = require ('./core/server/getRequestHandler.js');
const { postRequestHandler } = require ('./core/server/postRequestHandler.js');

const server = http.createServer ((req, res) => {
  switch (req.method) {
    case "GET":
      getRequestHandler (req, res);
    break;
    case "POST":
      postRequestHandler (req, res);
    break;
  }
});

server.listen (3000, 'localhost', () => {
  console.log ('Coding challenge MVP started...');
});

const http = require('http');
const fs = require('fs');

let content;
fs.readFile( `${__dirname}/index.html`, function read(err, data) {
  if (err) {
        throw err;
    }
    content = data;
});
//create a server object:
http.createServer(function (req, res) {
  res.write(content); //write a response to the client
  res.end(); //end the response
}).listen(3000); //the server object listens on port 8080

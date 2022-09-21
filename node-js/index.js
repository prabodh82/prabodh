// console.log('Hello how are you?');

const http = require('http');

function greet(req, res) {
    res.write("<h1>Hi this is Joy, hope you have great day.</h1>");
}

http.createServer(greet).listen(5000);
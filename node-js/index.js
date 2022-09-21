// console.log('Hello how are you?');

const http = require('http');

function greet(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(
        JSON.stringify({
            name: "Prabodh",
            empId: "001",
            address: {
                street: "XYZ Street",
                city: "Pune",
                state: "Maharashtra"
            }
        })
    )

    // res.write("<h1>Hi this is Joy, hope you have great day.</h1>");
    res.end();
}

http.createServer(greet).listen(5000);
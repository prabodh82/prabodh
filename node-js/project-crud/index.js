const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeedb'
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("successfull connection");
    } else console.log('DB connection failed ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("Express server is running at port 3000"));

app.get("/getEmployees", (req, res) => {
    mysqlConnection.query("select * from employee", (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else console.log(err);
    })
})

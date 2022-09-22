const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("successfull connection");
    } else console.log('DB connection failed ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("Express server is running at port 3000"));

// get all employees
app.get("/getemployees", (req, res) => {
    mysqlConnection.query("select * from employee", (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else console.log(err);
    })
});

// get employee by id
app.get("/getemployee/:id", (req, res) => {
    mysqlConnection.query("select * from employee where EmpID = ?", [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else console.log(err);
    })
});

// delete employee
app.delete("/deleteemployee/:id", (req, res) => {
    mysqlConnection.query("Delete from employee where EmpID = ?", [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('employee deleted sucessfully');
        } else console.log(err);
    })
})



// add employee
app.post("/addemployee", (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
        CALL EmployeeAddOrEdit (@EmpID, @Name, @EmpCode, @Salary);"
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor === Array)
                    res.send("Employee ID of the inserted employee is " + element[0].EmpID)
            });
        else console.log(err);
    })
})


// update employee
app.put("/updateemployee/", (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
        CALL EmployeeAddOrEdit (@EmpID, @Name, @EmpCode, @Salary);"
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err) {
            res.send('Employee updated successfully!')
        } else console.log(err);
    })
})




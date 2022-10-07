const router = require('express').Router();
const Employee = require("../model/employee");

router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json({
            success: 1,
            data: employees
        })

    } catch (err) {
        console.log('err', err);
    }
})

router.get("/:empId", async (req, res) => {
    try {
        const empId  = req.params.empId;
        const employee = await Employee.findOne({ empId });
        res.json({
            success: 1,
            data: employee
        })
    } catch (err) {
        console.log('err', err);
    }
})

router.post("/", async (req, res) => {
    try{
        const body = req.body;
        const newEmployee = new Employee({ ...body });
        await newEmployee.save();
        res.json({
            success: 1,
            message : "new employee created",
            data : newEmployee
        })
    }catch(err){
        console.log(err);
    }
})

router.put("/:empId", (req, res) => {
    res.json({
        message: "update api is working"
    })
})

router.delete("/:empId", (req, res) => {
    try{

    }catch(err){
        console.log(err);
    }
    // res.json({
    //     message: "delete api is working"
    // })
})

module.exports = router;
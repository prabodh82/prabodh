const ex = require('express');
const router = ex.Router();

const Course = require('../models/course');

// get all courses
router.get('/allcourses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.json(err)
    }
});

// add a course
router.post('/addcourse', async (req, res) => {
    try {
        console.log(req.body);
        const Course = await Course.create(req.body);
        res.json(Course);
    } catch (err) {
        res.json(err)
    }
})


module.exports = router;
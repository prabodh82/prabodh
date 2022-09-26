const ex = require('express');
const router = ex.Router();

const Course = require('../models/course');

// get all courses
router.get('/allcourses', async (req, res) => {
    try {
        console.log(req);
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.json(err)
    }
});

// add a course
router.post('/addcourse', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.json(course);
    } catch (err) {
        res.json(err)
    }
})

// delete course
router.delete('/delete/:courseId', async (req, res) => {
    try {
        await Course.remove({ _id: req.params.courseId });
        res.status(200).json({
            message: 'deleted successfully'
        });
    } catch (err) {
        res.json(err)
    }
});

// update course
router.put('/update/:courseId', async (req, res) => {

    const courseId = req.params.courseId;
    try {
        const course = await Course.updateOne({ _id: courseId }, req.body);
        res.json(course)
    } catch (err) {
        res.json(err)
    }
});

module.exports = router;
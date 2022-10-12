const router = require('express').Router();
const { createPensioner } = require("../controllers/pensioner.controller")

// add a new pensioner
router.post("/", createPensioner);

module.exports = router;
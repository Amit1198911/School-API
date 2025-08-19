// src/routes/schools.js
const express = require('express');
const router = express.Router();
const { addSchool, listSchools} = require('../controllers/school.controllers.js');

router.route('/addSchool').post(addSchool);

router.route('/listSchools').get(listSchools);

module.exports = router;

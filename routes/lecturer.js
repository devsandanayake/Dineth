const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecturer');
const { verifyToken } = require('../auth');

// Get all lecturers
router.get('/', verifyToken, async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.json(lecturers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a lecturer
router.post('/',verifyToken, async (req, res) => {
    const lecturer = new Lecturer({
        lecturerID: req.body.lecturerID,
        name: req.body.name,
        department: req.body.department
    });
    try {
        const newLecturer = await lecturer.save();
        res.status(201).json(newLecturer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
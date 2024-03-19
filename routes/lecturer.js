const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecturer');
const { verifyToken } = require('../auth');

// Get all lecturers
router.get('/', async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.json(lecturers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get a lecturer
router.get('/:id', async (req, res) => {
    try {
        const lecturers = await Lecturer.findById(req.params.id);
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

// Update a lecturer
router.patch('/:id',verifyToken, async (req, res) => {
    try {
        const lecturer = await Lecturer.findById(req.params.id);
        if (req.body.lecturerID) {
            lecturer.lecturerID = req.body.lecturerID;
        }
        if (req.body.name) {
            lecturer.name = req.body.name;
        }
        if (req.body.department) {
            lecturer.department = req.body.department;
        }
        const updatedLecturer = await lecturer.save();
        res.json(updatedLecturer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a lecturer
router.delete('/:id',verifyToken, async (req, res) => {
    try {
        const lecturer = await Lecturer.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true, massage:"Deleted Successfully"
           })
        res.json(lecturer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
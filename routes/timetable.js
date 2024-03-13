const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');
const Module = require('../models/module');
const Lecturer = require('../models/lecturer');
const Class = require('../models/class');

// Get all timetables
router.get('/', async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Post a timetable
router.post('/', async (req, res) => {
     const { moduleCode, lecturerID, classID, startTime, endTime, day } = req.body;

     const existingModule = await Module.findOne({ moduleCode });
        if (!existingModule) {
            return res.status(400).json({ message: 'Module does not exist' });
        }

      const existingLecturer = await Lecturer.findOne({ lecturerID });
       if (!existingLecturer) {
            return res.status(400).json({ message: 'Lecturer does not exist' });
        }

      const existingClass = await Class.findOne({classID});
       if (!existingClass) {
            return res.status(400).json({ message: 'Class does not exist' });
        }
      
    
         //didnt insert same time sand day for same class
        const existingTimetable = await Timetable.findOne({ classID, startTime, day });
        if (existingTimetable) {
            return res.status(400).json({ message: 'Class already has a timetable at this time' });
        }

    const timetable = new Timetable({
        moduleCode,
        lecturerID,
        classID,
        startTime,
        endTime,
        day
    });
    try {
        const newTimetable = await timetable.save();
        res.status(201).json(newTimetable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
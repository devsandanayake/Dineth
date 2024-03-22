const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');
const Module = require('../models/module');
const Lecturer = require('../models/lecturer');
const Class = require('../models/class');
const { verifyToken } = require('../auth');

// Get all timetables
router.get('/', async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const timetables = await Timetable.findById(req.params.id);
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Post a timetable
router.post('/',verifyToken, async (req, res) => {
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

// Update a timetable
router.patch('/:id', async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id);
        if (req.body.moduleCode) {
            timetable.moduleCode = req.body.moduleCode;
        }
        if (req.body.lecturerID) {
            timetable.lecturerID = req.body.lecturerID;
        }
        if (req.body.classID) {
            timetable.classID = req.body.classID;
        }
        if (req.body.startTime) {
            timetable.startTime = req.body.startTime;
        }
        if (req.body.endTime) {
            timetable.endTime = req.body.endTime;
        }
        if (req.body.day) {
            timetable.day = req.body.day;
        }

        timetable.status = 'updated';
        const updatedTimetable = await timetable.save();
        res.json(updatedTimetable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a timetable
router.delete('/:id',verifyToken, async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndDelete(req.params.id);
        res.status(200).json({
        success:true, massage:"Deleted Successfully"
       })
        res.json(timetable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get updated timetable status
router.post('/updated', async (req, res) => {
    try {
        const timetables = await Timetable.find({ status: 'updated' });
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
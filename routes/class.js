const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const { verifyToken } = require('../auth');

// Get all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get a class
router.get('/:id', async (req, res) => {
    try {
        const classes = await Class.findById(req.params.id);
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a class
router.post('/',verifyToken, async (req, res) => {
    const classes = new Class({
        classID: req.body.classID,
        location: req.body.location
    });
    try {
        const newClass = await classes.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a class
router.patch('/:id',verifyToken, async (req, res) => {
    try {
        const classes = await Class.findById(req.params.id);
        if (req.body.classID) {
            classes.classID = req.body.classID;
        }
        if (req.body.location) {
            classes.location = req.body.location;
        }
        const updatedClass = await classes.save();
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a class
router.delete('/:id',verifyToken, async (req, res) => {
    try {
        const classes = await Class.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true, massage:"Deleted Successfully"
           })
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
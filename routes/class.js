const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const { verifyToken } = require('../auth');

// Get all classes
router.get('/',verifyToken, async (req, res) => {
    try {
        const classes = await Class.find();
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


module.exports = router;
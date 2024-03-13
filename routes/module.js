const express = require('express');
const router = express.Router();
const Module = require('../models/module');

// Get all modules
router.get('/', async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a module
router.post('/', async (req, res) => {
    const module = new Module({
        moduleCode: req.body.moduleCode,
        moduleName: req.body.moduleName
    });
    try {
        const newModule = await module.save();
        res.status(201).json(newModule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
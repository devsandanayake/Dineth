const express = require('express');
const router = express.Router();
const Module = require('../models/module');
const { verifyToken } = require('../auth');
// Get all modules
router.get('/',verifyToken, async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a module
router.post('/',verifyToken, async (req, res) => {
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

// Update a module
router.patch('/:id',verifyToken, async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (req.body.moduleCode) {
            module.moduleCode = req.body.moduleCode;
        }
        if (req.body.moduleName) {
            module.moduleName = req.body.moduleName;
        }
        const updatedModule = await module.save();
        res.json(updatedModule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a module
router.delete('/:id',verifyToken, async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        const deletedModule = await module.remove();
        res.json(deletedModule);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
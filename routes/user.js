const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const user = require('../models/user');


// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a user
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username}).then(user => {
        if (!user){
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                } else {
                    const user = new User({
                        username,
                        password: hash,
                        role
                    });
                    user.save().then(user => {
                        res.status(201).json(user);
                    }).catch(err => {
                        res.status(400).json({ message: err.message });
                    });
                }
            });

        }
        else {
            res.status(400).json({ message: 'Username already exists' });
        }
    }
    ).catch(err => {
        res.status(500).json({ message: err.message });
    });
}
);


// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const playload = {
                    username: user.username,
                    role: user.role
                };
                const token = jwt.sign(playload, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({ message: 'Login successful' });
        }
        else {
            res.status(400).json({ message: 'Invalid password' });
        }
        
    }
    else {
        res.status(400).json({ message: 'Invalid username' });
    }
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });

});
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

exports.verifyToken = function(req, res ,next){
    const cookie = req.headers.cookie
    if (!cookie) return res.status(403).send('A token is required for authentication');

    const token = cookie.split('=')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.decoded = decoded;

        // Check if the user is an admin
        if (decoded.role !== 'admin') {
            return res.status(403).send('Forbidden: Only admins are allowed');
        }
        next();

        
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}
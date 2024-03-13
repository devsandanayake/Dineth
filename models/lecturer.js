const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    lecturerID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Lecturer', lecturerSchema);
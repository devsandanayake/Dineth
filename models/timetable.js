const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    moduleCode: {
        type: String,
        required: true
    },
    lecturerID: {
        type: String,
        required: true
    },
    classID: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Timetable', timetableSchema);
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classID: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Class', classSchema);
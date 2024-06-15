const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    clientMessage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feedbacks', feedbackSchema);
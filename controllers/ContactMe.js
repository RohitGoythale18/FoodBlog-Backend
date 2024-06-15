const ContactMe = require('../models/ContactMe');
const { default: mongoose } = require('mongoose');

module.exports.addFeedback = async (req, res) => {
    const { clientName, clientEmail, clientMessage } = req.body;

    try {
        const OldFeedback = await ContactMe.findOne({ clientName });

        if (OldFeedback) {
            return res.status(400).send({ msg: "Feedback already exists" });
        }

        const NewFeedback = new ContactMe({ clientName, clientEmail, clientMessage });
        await NewFeedback.save();

        res.status(201).send({ msg: "Feedback added successfully" });
    } catch (err) {
        console.error('Error adding feedback:', err);
        res.status(500).send({ msg: "Error adding feedback", error: err.message });
    }
};

module.exports.getFeedback = async (req, res) => {
    try {
        const feedback = await ContactMe.find();
        res.status(200).json({ msg: "Feedback captured successfully", feedback: feedback });
    } catch (err) {
        console.error('Error getting feedback:', err);
        res.status(500).send({ code: 500, msg: "Internal error occurred", error: err.message });
    }
};

module.exports.deleteFeedback = async (req, res) => {
    try {
        console.log(`Deleting feedback with id: ${req.params.id}`);
        const feedback = await ContactMe.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }
        res.status(200).send({ message: "Feedback deleted successfully" });
    } catch (err) {
        console.error('Error deleting Feedback:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};
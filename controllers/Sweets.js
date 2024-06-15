const Sweets = require('../models/Sweets');
const { default: mongoose } = require('mongoose');

module.exports.addSweets = async (req, res) => {
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const OldSweets = await Sweets.findOne({ recipeName });

        if (OldSweets) {
            return res.status(400).send({ msg: "Recipe already exists" });
        }

        const NewSweets = new Sweets({ recipeName, recipeIngredients, recipeSteps });
        await NewSweets.save();

        res.status(201).send({ msg: "Recipe added successfully" });
    } catch (err) {
        console.error('Error adding recipe:', err);
        res.status(500).send({ msg: "Error adding recipe", error: err.message });
    }
};

module.exports.getSweets = async (req, res) => {
    try {
        const sweets = await Sweets.find();
        res.status(200).json({ msg: "Recipes captured successfully", sweets: sweets });
    } catch (err) {
        console.error('Error getting sweets:', err);
        res.status(500).send({ code: 500, msg: "Internal error occurred", error: err.message });
    }
};

module.exports.updateLikeStatus = async (req, res) => {
    const { id, liked } = req.body;

    try {
        const sweets = await Sweets.findByIdAndUpdate(id, { liked }, { new: true });
        if (!sweets) {
            return res.status(404).send({ message: "Sweets not found" });
        }
        res.status(200).send({ message: "Like status updated successfully", sweets });
    } catch (err) {
        console.error('Error updating like status:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.getSweetsById = async (req, res) => {
    try {
        const sweets = await Sweets.findById(req.params.id);
        if (!sweets) {
            return res.status(404).send({ message: "Sweets not found" });
        }
        res.status(200).send(sweets);
    } catch (err) {
        console.error('Error getting sweets by ID:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.updateSweets = async (req, res) => {
    try {
        const sweets = await Sweets.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sweets) {
            return res.status(404).send({ message: "Sweets not found" });
        }
        res.status(200).send(sweets);
    } catch (err) {
        console.error('Error updating sweets:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.deleteSweets = async (req, res) => {
    try {
        console.log(`Deleting sweet with id: ${req.params.id}`);
        const sweets = await Sweets.findByIdAndDelete(req.params.id);
        if (!sweets) {
            return res.status(404).send({ message: "Sweets not found" });
        }
        res.status(200).send({ message: "Sweets deleted successfully" });
    } catch (err) {
        console.error('Error deleting sweets:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

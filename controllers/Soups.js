const Soups = require('../models/Soups');
const { default: mongoose } = require('mongoose');

module.exports.addSoups = async (req, res) => {
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const OldSoups = await Soups.findOne({ recipeName });

        if (OldSoups) {
            return res.status(400).send({ msg: "Recipe already exists" });
        }

        const NewSoups = new Soups({ recipeName, recipeIngredients, recipeSteps });
        await NewSoups.save();

        res.status(201).send({ msg: "Recipe added successfully" });
    } catch (err) {
        console.error('Error adding recipe:', err);
        res.status(500).send({ msg: "Error adding recipe", error: err.message });
    }
};

module.exports.getSoups = async (req, res) => {
    try {
        const soups = await Soups.find();
        res.status(200).json({ msg: "Recipes captured successfully", soups: soups });
    } catch (err) {
        console.error('Error getting sweets:', err);
        res.status(500).send({ code: 500, msg: "Internal error occurred", error: err.message });
    }
};

module.exports.getSoupssById = async (req, res) => {
    try {
        const soups = await Soups.findById(req.params.id);
        if (!soups) {
            return res.status(404).send({ message: "Soups not found" });
        }
        res.status(200).send(soups);
    } catch (err) {
        console.error('Error getting soups by ID:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.updateSoups = async (req, res) => {
    try {
        const soups = await Soups.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!soups) {
            return res.status(404).send({ message: "Soups not found" });
        }
        res.status(200).send(soups);
    } catch (err) {
        console.error('Error updating soups:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.deleteSoups = async (req, res) => {
    try {
        console.log(`Deleting soup with id: ${req.params.id}`);
        const soups = await Soups.findByIdAndDelete(req.params.id);
        if (!soups) {
            return res.status(404).send({ message: "Soups not found" });
        }
        res.status(200).send({ message: "Soups deleted successfully" });
    } catch (err) {
        console.error('Error deleting soups:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

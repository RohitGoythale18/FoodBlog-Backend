const Spices = require('../models/Spices');
const { default: mongoose } = require('mongoose');

module.exports.addSpices = async (req, res) => {
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    const spiceFound = await Spices.findOne({ recipeName });

    if (spiceFound) {
        return res.status(400).send({ msg: "Recipe already exists" });
    }

    try {
        const newSpice = await Spices.create({
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        });

        res.json({
            status: 'success',
            data: {
                "recipe id": newSpice._id,
            },
        });
    } catch (error) {
        res.status(500).send({ msg: "Error adding recipe", error: error.message });
    }
};

module.exports.getSpices = async (req, res) => {
    try {
        const spices = await Spices.find();
        res.status(200).json({ msg: "Recipes captured successfully", spices: spices });
    } catch (err) {
        console.error('Error getting spices:', err);
        res.status(500).send({ code: 500, msg: "Internal error occurred", error: err.message });
    }
};

module.exports.getSpicesById = async (req, res) => {
    try {
        const spices = await Spices.findById(req.params.id);
        if (!spices) {
            return res.status(404).send({ message: "Spices not found" });
        }
        res.status(200).send(spices);
    } catch (err) {
        console.error('Error getting Spices by ID:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.updateSpices = async (req, res) => {
    try {
        const spices = await Spices.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!spices) {
            return res.status(404).send({ message: "Spices not found" });
        }
        res.status(200).send(Spices);
    } catch (err) {
        console.error('Error updating Spices:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

module.exports.deleteSpices = async (req, res) => {
    try {
        console.log(`Deleting spices with id: ${req.params.id}`);
        const spices = await Spices.findByIdAndDelete(req.params.id);
        if (!spices) {
            return res.status(404).send({ message: "Spices not found" });
        }
        res.status(200).send({ message: "Spices deleted successfully" });
    } catch (err) {
        console.error('Error deleting spices:', err);
        res.status(500).send({ msg: "Internal error occurred", error: err.message });
    }
};

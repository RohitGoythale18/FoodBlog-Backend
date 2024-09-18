const Sweets = require('../models/Sweets');
const { default: mongoose } = require('mongoose');

module.exports.addSweets = async (req, res) => {
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    const sweetFound = await Sweets.findOne({ recipeName });

    if (sweetFound) {
        return res.status(400).send({ msg: "Recipe already exists" });
    }

    try {
        const newSweet = await Sweets.create({
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        });

        res.json({
            status: 'success',
            data: {
                "recipe id": newSweet._id,
            },
        });
    } catch (error) {
        res.status(500).send({ msg: "Error adding recipe", error: error.message });
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
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const sweetFound = await Sweets.findOne({ recipeName });

        if (!sweetFound) {
            return res.status(404).send({ message: "Sweets not found" });
        }

        const updateSweet = await Sweets.findByIdAndUpdate(req.params.id, {
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        }, {
            new: true,
        });

        res.json({
            status: 'updated'
        });
    } catch (error) {
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

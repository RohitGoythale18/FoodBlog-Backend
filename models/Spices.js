const mongoose = require('mongoose');

const spicesSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    recipeIngredients: {
        type: String,
        required: true
    },
    recipeSteps: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Spices', spicesSchema);
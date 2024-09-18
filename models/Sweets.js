const mongoose = require('mongoose');

const sweetsSchema = new mongoose.Schema({
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
    },
    recipeImage:{
        type: String,
    },
    liked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Sweets', sweetsSchema);

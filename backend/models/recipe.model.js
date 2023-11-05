

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    user_id: String,
    food_id: String,
    title: String,
    image: String
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = { RecipeModel };
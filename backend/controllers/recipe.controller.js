const { RecipeModel } = require('../models/recipe.model');

const savedRecipe = async (req, res) => {
    const { food_id, title, image } = req.body;
    const user_id = req.user
    console.log(req.body);
    console.log(user_id);
    try {
        const existingRecipe = await RecipeModel.findOne({ food_id, user_id });

        if (existingRecipe) {
            return res.status(201).json({ msg: 'Recipe is already saved' });
        }

        const newRecipe = new RecipeModel({
            user_id,
            food_id,
            title,
            image,
        });

        await newRecipe.save();
        // console.log("successfully");

        res.status(200).json({ msg: 'Recipe saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while saving the recipe.' });
    }
};

const getSavedRecipe = async (req, res) => {
    try {
        const user_id = req.user;

        const existingRecipe = await RecipeModel.find({ user_id });

        res.send(existingRecipe)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while geting the saved recipe.' });
    }
}
const deleteSavedRecipe = async (req, res) => {
    const { _id } = req.params;

    try {
        const existingRecipe = await RecipeModel.findByIdAndDelete(_id);

        console.log("deleteSavedRecipe", existingRecipe);

        if (!existingRecipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }

        res.status(200).json({ msg: 'Recipe has been deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while deleting the saved recipe.' });
    }
}


module.exports = {
    savedRecipe, getSavedRecipe, deleteSavedRecipe
};

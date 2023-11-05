const axios = require('axios');

const fetchRecipe = async (req, res, next) => {
    const { query, cuisine } = req.query;
    const endpoint = 'complexSearch';

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${endpoint}`, {
            params: {
                apiKey: process.env.recipe_api_key,
                query: query,
                cuisine: cuisine,
            },
        });

        const recipeData = response.data;

        res.json(recipeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching recipe data.' });
    }
};

module.exports = {
    fetchRecipe,
};


const recipeDetails = async (req, res, next) => {
    const { id } = req.params;
    const query = req.query;
    const nutritionsNames = req.nutritions;


    if (!id) {

        return res.status(400).json({ error: 'Recipe ID is required' });
    }

    const endpoint = `${id}/information`;

    try {

        const response = await axios.get(`https://api.spoonacular.com/recipes/${endpoint}?apiKey=${process.env.recipe_api_key}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                query: query,

            },
        });

        const recipeData = response.data;
        const instructions = recipeData.instructions
        const title = recipeData.title
        const image = recipeData.image
        const id = recipeData.id
        const summary = recipeData.summary

        const steps = await recipeData.analyzedInstructions[0].steps;
        const uniqueIngredients = new Set();

        steps.forEach((step) => {
            if (step.ingredients) {
                step.ingredients.forEach((ingredient) => {
                    uniqueIngredients.add(ingredient.name);
                });
            }
        });

        // Convert the Set back to an array
        const ingredientsNames = Array.from(uniqueIngredients);

        const allData = { ingredientsNames, instructions, title, image, id, summary, nutritionsNames }
        res.status(200).json(allData);
    } catch (error) {
        console.error('Spoonacular API Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching recipe data.' });
    }
};


const nutritionalInfo = async (req, res, next) => {
    const { id } = req.params;
    const query = req.query;


    if (!id) {
        return res.status(400).json({ error: 'Recipe ID is required' });
    }

    const endpoint = `${id}/nutritionWidget.json`;

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${endpoint}?apiKey=${process.env.recipe_api_key}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                query: query,

            },
        });

        const recipeData = response.data;
        const nutritionsNames = [];


        const nutrition = await recipeData.nutrients;
        nutrition.forEach((step) => {
            if (step.name) {

                nutritionsNames.push(step.name);
            }
        });
        req.nutritions = nutritionsNames;
        next()
    } catch (error) {
        console.error('Spoonacular API Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching recipe data.' });
    }
};




module.exports = {
    fetchRecipe,
    recipeDetails,
    nutritionalInfo
};

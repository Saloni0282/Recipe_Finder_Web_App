const axios = require('axios');
const fetchRecipe = async (req, res, next) => {
    const { query, cuisine } = req.body
    var endpoint = "complexSearch"
    try {

        const response = await axios.get(`https://api.spoonacular.com/recipes/${endpoint}?apiKey=${process.env.recipe_api_key}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
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
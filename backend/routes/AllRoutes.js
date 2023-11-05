const express = require('express');

const AllRoutes = express.Router();
const { login, signup, home } = require("../controllers/user.controller");
const { fetchRecipe, recipeDetails, nutritionalInfo}= require("../services/fetch_recipe")
const {Auth}=require("../middlewares/Auth")
AllRoutes.post("/login", login);
AllRoutes.post("/signup", signup);
AllRoutes.get('/check',Auth,home)
AllRoutes.get("/get", fetchRecipe);
AllRoutes.get("/info/:id", Auth, nutritionalInfo, recipeDetails);




module.exports = {
    AllRoutes
}


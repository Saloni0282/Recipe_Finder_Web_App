const express = require('express');

const AllRoutes = express.Router();
const { login, signup,home} = require("../controllers/user.controller");
const {Auth}=require("../middlewares/Auth")
AllRoutes.post("/login", login);
AllRoutes.post("/signup", signup);
AllRoutes.get('/check',Auth,home)





module.exports = {
    AllRoutes
}


const express = require('express');

const AllRoutes = express.Router();
const { login, signup} = require("../controllers/user.controller");

AllRoutes.post("/login", login);
AllRoutes.post("/signup", signup);





module.exports = {
    AllRoutes
}


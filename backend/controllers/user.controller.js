const { UserModel } = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if a user with the provided email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(201).json({ "msg": 'User already exists. Please login.' });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        // Respond with a success message
        res.status(200).json({ "msg": 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(201).json({ "msg": 'User not found. Please sign up.' });
        }

        // Compare the hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(201).json({ "msg": 'Invalid password' });
        }

        // If the user is authenticated, generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.secret_key, { expiresIn: '5h' });

        // Return the token to the client
        res.status(200).json({ "msg": "Login Successfull", "token": token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }

}



module.exports = {
    login,
    signup

}
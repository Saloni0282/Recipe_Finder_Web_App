const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors())
const { connection } = require('./config/db');
const { AllRoutes } = require("./routes/AllRoutes");

app.get('/', (req, res) => {
    res.send('Welcome To Recipe App!');
});
app.use(AllRoutes)

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Server listening on port 8000');
    } catch (error) {
        console.log(error);
        console.log('No connection');
    }
})


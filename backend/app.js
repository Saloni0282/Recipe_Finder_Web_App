const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.send('Welcome To Recipe App!');
});
app.listen(process.env.port, async () => {
   
        console.log('Server listening on port 8000')
})

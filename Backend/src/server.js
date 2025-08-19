// src/server.js
const dotenv = require('dotenv');
dotenv.config({
    path: './.env' // Adjust the path to your .env file if necessary
}
);
const express = require('express');
const cors = require('cors');

const schoolsRouter = require('../src/routes/school.routes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', schoolsRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app; // Export the app for testing or other purposes

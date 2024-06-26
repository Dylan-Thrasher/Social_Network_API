const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express()

// adds middleware to server and parse JSON
app.use(express.json())

// connection to Mongo DB
mongoose.connect('mongodb://localhost:27017/socialNetwork').then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.use(routes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
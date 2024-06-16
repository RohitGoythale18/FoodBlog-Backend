const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ['https://foodmania-foodblog.netlify.app'],
}));

app.use('/', routes);


mongoose.connect('mongodb+srv://rohitgoythale23:rohitgoythale23@foodblog.jrvcnai.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(PORT, () => {
    console.log(`Server is running on https://foodblog-backend.onrender.com:${PORT}`);
});
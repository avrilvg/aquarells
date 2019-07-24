// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const acuarela = require('./routes/acuarela.route'); // Imports routes for the acuarelas
const users = require('./routes/user.route');
const app = express();
const port = process.env.PORT || 8080;

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/acuarelas';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(cors());
app.use(bodyParser.json());
app.use('/acuarelas', acuarela);
app.use('/users', users);

//if (process.env.NODE_ENV === 'production') {
// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
//}

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//Execute express
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Import routes
const routes = require('./routes/routes');
const custom_routes = require('./routes/custom_routes');


app.use('/api', routes);
app.use('/api', custom_routes);


//mongoose.Promise = global.Promise

//Connect to DB
console.log(process.env.DB_CONNECTION)
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connect to DB'));

//Listen to the server
app.listen(5000);

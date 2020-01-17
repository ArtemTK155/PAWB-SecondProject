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
const routesCustomModel = require('./routes/custom_model');
const routes = require('./routes/routes');

app.use('/api/custom_model', routesCustomModel);
app.use('/api/routes', routes);



//mongoose.Promise = global.Promise

//Connect to DB
console.log(process.env.DB_CONNECTION)
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connect to DB'));

//Listen to the server
app.listen(4000);

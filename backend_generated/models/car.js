const mongoose = require('mongoose');

const car = mongoose.Schema({
	
	f1 : String,
	f2 : String,
	f3 : String
	
});

module.exports = mongoose.model('car', car);
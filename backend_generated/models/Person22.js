const mongoose = require('mongoose');

const Person22 = mongoose.Schema({
	
	f1 : String,
	f2 : String,
	f3 : String
	
});

module.exports = mongoose.model('Person22', Person22);
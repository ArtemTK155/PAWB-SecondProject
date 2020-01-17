const mongoose = require('mongoose');

const Model_test = mongoose.Schema({
	
	field_1 : String,
	field_2 : String,
	field_3 : String
	
});

module.exports = mongoose.model('Model_test', Model_test);
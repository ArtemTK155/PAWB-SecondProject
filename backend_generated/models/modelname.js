const mongoose = require('mongoose');

const modelname = mongoose.Schema({
	
	field : null
	
});

module.exports = mongoose.model('modelname', modelname);
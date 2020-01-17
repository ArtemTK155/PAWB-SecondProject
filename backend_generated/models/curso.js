const mongoose = require('mongoose');

const curso = mongoose.Schema({
	
	qtt : Number,
	nome : String,
	ects : Number,
	duracao : String
	
});

module.exports = mongoose.model('curso', curso);
const mongoose = require('mongoose');

const CustomRoute = mongoose.Schema({
	endpoint : String,
	type: String,
	model : String,
	task : String,
	searchField : String,
	searchValue : String
});

module.exports = mongoose.model('Route', CustomRoute);

const express = require('express');
const router = express.Router();
const axios = require('axios');

const CustomRoute = require('../models/CustomRoute');


router.get('/get_all_routes', async (req, res) => {
	try {
		const routes = await CustomRoute.find({}, {
			endpoint: 1,
			type : 1,
			model : 1
		});
		res.json(routes);
	} catch (error) {
		console.log(error);
	}
});


//Create a new CustomRoute
router.post('/', async (req, res) => {
	const url1 = "http://backend_generated:5000/api/make_new_route/post";
	const url2 = "http://backend_generated:5000/api/make_new_route/getall";
	const url3 = "http://backend_generated:5000/api/delete_by_id";

	const customRoute = new CustomRoute(req.body);
	var task = req.body.task;
	try {
		const saved = await customRoute.save();
		//Make a api call to the generated to create the .js file
		if (task === "Create") {
			const response = await axios.post(url1, saved);
			console.log(response.data);
			return res.json(saved);
		} else if (task === "GetAll") {
			const response = await axios.post(url2, saved);
			console.log(response.data);
			return res.json(saved);
		} else if (task === "DeleteById") {
			const response = await axios.post(url3, saved);
			console.log(response.data);
			return res.json(saved);
		}
	} catch (err) {
		console.log(err);
		return res.json({ code: '500', msg: 'Failed to create' });
	}
});
//localhost:5000/api/make_new_model

module.exports = router;


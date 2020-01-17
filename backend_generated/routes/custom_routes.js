const express = require('express');
const router = express.Router();
const Model_test = require('../models/Model_test');
const car = require('../models/car');
const curso = require('../models/curso');
//#NEW_MODEL_IMPORT#


router.post('/test/model_test/make', async (req, res) => {
	const model = new Model_test(req.body)
	try {
		const saved = await model.save();
		return res.json(saved);
	} catch (err) {
		console.log(err);
		return res.json({ code: '500', msg: 'Failed to create' });
	}
});

router.get('/test/model_test/getall', async (req, res) => {
	try {
		const model = await Model_test.find()
		res.json(model);
	} catch (err) {
		console.log(err);
	}
});


router.delete('/delete/modeltest/:id', async (req, res) => {
	try {
		const model = await Model_test.remove({
			_id: req.params.id
		});
		res.json(model);
	} catch (err) {
		console.log(err);
	}
});


router.post('/test/make/car', async (req, res) => {
	const model = new car(req.body)
	try {
		const saved = await model.save();
		return res.json(saved);
	} catch (err) {
		console.log(err);
		return res.json({ code: '500', msg: 'Failed to create' });
	}
});

router.post('/ufp/curso', async (req, res) => {
	const model = new curso(req.body)
	try {
		const saved = await model.save();
		return res.json(saved);
	} catch (err) {
		console.log(err);
		return res.json({ code: '500', msg: 'Failed to create' });
	}
});

router.delete('/ufp/curso/del/:id', async (req, res) => {
	try {
		const model = await curso.remove({
			_id: req.params.id
		});
		res.json(model);
	} catch (err) {
		console.log(err);
	}
});


router.get('/ufp/curso/all', async (req, res) => {
	try {
		const model = await curso.find()
		res.json(model);
	} catch (err) {
		console.log(err);
	}
});

//#NEW_ROUTE#


module.exports = router;

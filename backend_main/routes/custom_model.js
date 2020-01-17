const express = require("express");
const router = express.Router();
const axios = require("axios");

const CustomModel = require("../models/CustomModel");

router.post("/get_model", async (req, res) => {
  try {
    const model = await CustomModel.find({ customModelName: req.body.model });
    res.json(model);
  } catch (error) {
    console.log(error);
  }
});

//
router.get("/get_models", async (req, res) => {
  try {
    const models = await CustomModel.find(
      {},
      {
        customModelName: 1, //only include this fielde in the collection,
        fields: 1
      }
    );
    res.json(models);
  } catch (err) {
    console.log(err);
  }
});

//Create a new CustomModel
router.post("/", async (req, res) => {
  const url = "http://backend_generated:5000/api/make_new_model";
  const customModel = new CustomModel(req.body);
  try {
    const saved = await customModel.save();
    //Make a api call to the generated to create the .js file
    const response = await axios.post(url, saved);
    console.log(response.data);
    return res.json(saved);
  } catch (err) {
    console.log(err);
    return res.json({ code: "500", msg: "Failed to create" });
  }
});

router.get("/t", async (req, res) => {
  const url = "http://localhost:5000/api/test";
  const url2 = "http://backend_generated:5000/api/test";
  /*
	axios.get(url2)
		.then(function (response) {
			console.log(response.data);
			return res.json({ code: '200', msg: 'create' });

		})
		.catch(function (error) {
			// handle error
			console.log(error);
		});
		*/
  try {
    const response = await axios.get(url2);
    console.log(response.data);
    return res.json({ code: "200", msg: "create" });
  } catch (err) {
    console.log(err);
    return res.json({ code: "500", msg: "Failed to create" });
  }
});

//localhost:5000/api/make_new_model

module.exports = router;

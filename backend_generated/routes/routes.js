const express = require('express');
const router = express.Router();
var fs = require('fs');
const {
    pathToModelsDir,
    pathToTemplatesModelFile,
    pathToTemplatesRoutePostOne,
    pathToCustomRoutes,
    pathToTemplatesRouteGetAll,
    pathToTemplatesRoutesDeleteById
} = require('../utils/local_file_paths');


//Create a Model.js file
router.post('/make_new_model', async (req, res) => {
    var fileName = req.body.customModelName + ".txt";
    var fileNameJs = req.body.customModelName + ".js";
    var dest = pathToModelsDir + fileNameJs;
    var field, fields = "";
    //Copy file from templates
    fs.copyFileSync(pathToTemplatesModelFile, dest);
    console.log('source.txt was copied to destination.txt');
    //Construct the model fields
    var arr = req.body.fields;
    arr.forEach((val, key, arr) => {
        if (Object.is(arr.length - 1, key)) {
            // execute last item logic
            console.log(`Last callback call at index ${key} with value ${val}`);
            field = val.body + " : " + val.theType;
            fields = fields.concat(field);
        } else {
            field = val.body + " : " + val.theType + ",\n\t";
            fields = fields.concat(field);
        }
    });
    //Replace the macros
    fs.readFile(pathToModelsDir + fileNameJs, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var data = data.replace(/#MODEL#/g, req.body.customModelName);
        var data = data.replace(/#MODEL_FIELDS#/g, fields);
        fs.writeFile(pathToModelsDir + fileNameJs, data, 'utf8', (err) => {
            if (err) {
                console.log('An error occured', err);
            }
        });
        console.log("macros replaced")
    });

    res.status(200).end()
});

router.post('/make_new_route/post', async (req, res) => {
    var content, content2, importModel, model, endPoint, importModelRep,
        createModel, sRegExInput, sRegExModel, newRoute;

    content = fs.readFileSync(pathToTemplatesRoutePostOne, 'utf8');
    content2 = fs.readFileSync(pathToCustomRoutes, 'utf8');
    importModel = "//#NEW_MODEL_IMPORT#"
    model = req.body.model;
    endPoint = "" + req.body.endpoint;
    //Creat correct import for the model this route will use
    importModelRep = "const " + model + " = require('../models/" + model + "');"
    //Create the model
    createModel = "const model = new " + model + "(req.body)";
    sRegExModel = new RegExp(importModel, "g");
    content = content.replace(/#ENDPOINT#/g, endPoint);
    content = content.replace(/#MODEL_INSTANCE#/g, createModel);
    newRoute = "//#NEW_ROUTE#";
    sRegExInput = new RegExp(newRoute, "g");
    content2 = content2.replace(sRegExInput, content + "\n" + newRoute);
    if (!content2.includes(importModelRep)) {
        content2 = content2.replace(sRegExModel, importModelRep + "\n" + importModel);
    }
    fs.writeFile(pathToCustomRoutes, content2, 'utf8', (err) => {
        if (err) {
            console.log('An error occured', err);
        }
    });
    res.status(200).end()
});

router.post('/make_new_route/getall', async (req, res) => {
    var content, content2, getAllMacro, model, endPoint, importModelRep, importModel,
        getAll, sRegExInput, sRegExModel, newRoute;

    content = fs.readFileSync(pathToTemplatesRouteGetAll, 'utf8');
    content2 = fs.readFileSync(pathToCustomRoutes, 'utf8');
    //const model = await Model.find();

    model = req.body.model;
    endPoint = "" + req.body.endpoint;
    getAllMacro = "//#GET_ALL#";
    getAll = "const model = await " + model + ".find()";
    importModel = "//#NEW_MODEL_IMPORT#"
    importModelRep = "const " + model + " = require('../models/" + model + "');"
    sRegExGetAll = new RegExp(getAllMacro, "g");
    sRegExModel = new RegExp(importModel, "g");

    content = content.replace(/#ENDPOINT#/g, endPoint);
    content = content.replace(sRegExGetAll, getAll);
    newRoute = "//#NEW_ROUTE#";
    sRegExInput = new RegExp(newRoute, "g");
    content2 = content2.replace(sRegExInput, content + "\n" + newRoute);
    if (!content2.includes(importModelRep)) {
        content2 = content2.replace(sRegExModel, importModelRep + "\n" + importModel);
    }
    fs.writeFile(pathToCustomRoutes, content2, 'utf8', (err) => {
        if (err) {
            console.log('An error occured', err);
        }
    });
    res.status(200).end()
});


router.post('/delete_by_id', async (req, res) => {
    var content, content2, model, endPoint, importModelRep, importModel,
        sRegExIdMacro, sRegExInput, sRegExModel, newRoute;

    content = fs.readFileSync(pathToTemplatesRoutesDeleteById, 'utf8');
    content2 = fs.readFileSync(pathToCustomRoutes, 'utf8');
    //const model = await Model.find();

    model = req.body.model;
    endPoint = "" + req.body.endpoint;
    importModel = "//#NEW_MODEL_IMPORT#"
    importModelRep = "const " + model + " = require('../models/" + model + "');"
    sRegExModel = new RegExp(importModel, "g");
    content = content.replace(/#ENDPOINT#/g, endPoint);
    content = content.replace(/#MODEL#/g, model);


    newRoute = "//#NEW_ROUTE#";
    sRegExInput = new RegExp(newRoute, "g");
    content2 = content2.replace(sRegExInput, content + "\n" + newRoute);
    if (!content2.includes(importModelRep)) {
        content2 = content2.replace(sRegExModel, importModelRep + "\n" + importModel);
    }
    fs.writeFile(pathToCustomRoutes, content2, 'utf8', (err) => {
        if (err) {
            console.log('An error occured', err);
        }
    });
    res.status(200).end()
});



//Testing
router.get('/test', async (req, res) => {
    return res.json({ code: '200', msg: 'Test created' });
});



//Testing
router.get('/testing', async (req, res) => {
    //Rename the file to a .js extencion
    //Rename the file to a .js extencion
    fs.rename('models/Gym.txt', 'models/Gym.js', function (err) {
        if (err) throw err;
        console.log('File Renamed.');
    });
    res.status(200).end()
});


module.exports = router;

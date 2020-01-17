const mongoose = require("mongoose");

const CustomModel = mongoose.Schema({
    customModelName: String,
    fields: [{ body: String, theType: String }],
    fieldsAdv: [
        {
            body: {
                name: String,
                fields: [
                    {
                        body: String,
                        theType: String
                    },

                ]
            }
        }
    ]
});

module.exports = mongoose.model("CustomModel", CustomModel);

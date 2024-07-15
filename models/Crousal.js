const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var crousalSchema = new mongoose.Schema({
    crousalData : [
        {
            title:String,
            description:String,
            crousalImg:String,
        }
    ]
});

//Export the model
module.exports = mongoose.model('Crousal', crousalSchema);
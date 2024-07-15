const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CategorySchema = new mongoose.Schema({
    category:{
        type: [String],
        default: ['All']
    }
});

//Export the model
module.exports = mongoose.model('categories', CategorySchema);
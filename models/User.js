const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
    },
    orders: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"orders"
        },
    ],
    address: {
        name: { type: String, },
        number: { type: String, },
        address: { type: String, },
        city: { type: String, },
        state: { type: String, },
        zip: { type: String, },
        country: { type: String, },
    }
});

//Export the model
module.exports = mongoose.model('users', userSchema);
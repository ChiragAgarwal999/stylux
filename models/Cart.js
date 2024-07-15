const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    _id: String,
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
},{ _id: false });

module.exports = mongoose.model('carts', cartSchema);



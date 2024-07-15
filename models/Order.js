const mongoose = require('mongoose'); // Erase if already required

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');
const day2 = String(today.getDate()+2).padStart(2, '0');

const orderDate = `${year}-${month}-${day}`;
const deliveryDate = `${year}-${month}-${day2}`;

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
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
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: orderDate,
    },
    deliveryDate: {
        type: Date,
        default: deliveryDate,
    },
    address: {
        name: { type: String },
        number: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String, default: "India" },
    }
});

// Export the model
module.exports = mongoose.model('orders', orderSchema);

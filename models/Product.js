const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    descount:{
        type:Number,
    },
    stock: {
        type: Number,
        min:0,
        required: true
    },
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
    },
    description: {
        type: String,
        // required: true
    },
    brand: {
        type: String,
        // required: true
    },
    isFeatured:{
        type:Boolean
    },
    isDealOFDay:{
        type:Boolean
    },
    imageURL: [{
        type: String,
        default:`https://www.bing.com/images/search?view=detailV2&ccid=GGfguZTT&id=75B8F833FE145FF9A9262BE713146C579CD4F273&thid=OIP.GGfguZTTTjV2Nx2ViJ5pwgHaE8&mediaurl=https%3a%2f%2fimages.pexels.com%2fphotos%2f1526%2fdark-blur-blurred-gradient.jpg%3fcs%3dsrgb%26dl%3ddark-blur-blurred-gradient-1526.jpg%26fm%3djpg&exph=3744&expw=5616&q=blure+image&simid=608045354173882385&FORM=IRPRST&ck=7A60C7F681F37A7DE2E7D0167895E805&selectedIndex=33&itb=0&ajaxhist=0&ajaxserp=0`,
        set:(v) => v === "" ? `https://source.unsplash.com/1600x900/?${this.ProductName}`:v,
        // required: true
    }]
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;

const ProductModel = require('../models/Product'); // Adjust path as necessary

const createProduct = async (req, res) => {
    try {
        const newProduct = {
            productName: req.body.productName,
            category: req.body.category,
            oldPrice: req.body.oldPrice,
            descount: req.body.descount,
            stock: req.body.stock,
            rating: req.body.rating,
            description: req.body.description,
            brand: req.body.brand,
            isFeatured: req.body.isFeatured,
            isDealOFDay: req.body.isDealOFDay,
            imageURL: req.files.map(file => `public/productImages/${file.filename}`)
        };
    
        const product = await ProductModel.create(newProduct);
        res.json(product);
    } catch (err) {
        // console.error('Error creating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProduct = async (req,res)=>{
    await ProductModel.find({})
    .then((product)=>res.json(product))
    .catch(err => res.status(500).json(err));
}

const getProductById = async (req,res)=>{
    const id = req.params.id
    await ProductModel.findById({_id:id})
    .then((product)=>res.json(product))
    .catch(err => res.status(500).json(err));
}

const editProductStock = async (req,res)=>{
    const id = req.params.id
    await ProductModel.findByIdAndUpdate({_id:id},{stock:req.body.stock})
    .then((product)=>res.json(product))
    .catch(err => res.status(500).json(err));
}

const editProductById = async (req, res) => {
    const id = req.params.id;
    const productData = {
        productName: req.body.productName,
        category: req.body.category,
        oldPrice: req.body.oldPrice,
        descount: req.body.descount,
        stock: req.body.stock,
        rating: req.body.rating,
        description: req.body.description,
        brand: req.body.brand,
        isFeatured: req.body.isFeatured,
        isDealOFDay: req.body.isDealOFDay,
    };

    try {
        // Fetch existing product from the database
        const existingProduct = await ProductModel.findById(id);

        // Extract existing images from request body
        const existingImages = Array.isArray(req.body.existingImageURL) ? req.body.existingImageURL : [req.body.existingImageURL];
        // Extract new image files from the request
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map(file => `public/productImages/${file.filename}`);
        }

        // Combine existing images with new images
        productData.imageURL = [...existingImages, ...newImages];

        // Update product in the database
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, productData, { new: true });
        
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProductById = async (req,res)=>{
    const id = req.params.id
    await ProductModel.findByIdAndDelete({_id:id})
    .then((product)=>res.json(product))
    .catch(err => res.status(500).json(err));
}

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    editProductStock,
    editProductById,
    deleteProductById,
}
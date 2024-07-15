const CartModel = require("../models/Cart"); 

const createCart = async (req, res) => {
    const id=req.params.id
    const { product, quantity, price } = req.body;
    try {
        let cart = await CartModel.findById({_id:id});
        if (!cart) {
            cart = new CartModel({ _id:id ,products: [{ product, quantity, price }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === product);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
                 if (cart.products[productIndex].quantity <= 0) {
                    // cart.products = cart.products.filter(p => p.product !== product);
                    cart.products.splice(productIndex, 1);
                }
            } else {
                cart.products.push({ product, quantity, price });
            }
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        // console.error("Error saving to cart:", err.message);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

const getCart = async (req, res) => {
    const id = req.params.id
    try {
        const cart = await CartModel.findById({_id:id}).populate('products.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

const updateCart = async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await CartModel.findByIdAndUpdate(id,{products:[]});
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

module.exports = {
    createCart,
    getCart,
    updateCart,
}
const OrderModel = require("../models/Order");
const UserModel = require('../models/User');

const createOrder = async (req, res) => {
    try {
      const order = await OrderModel.create(req.body);
      res.json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const storeOrder = async (req, res) => {
    const email = req.params.email
    const order = req.body.orderId;
    try {
     await UserModel.findOneAndUpdate(
        {email},
        { $push: { orders: order } }, // Use $push to add to the orders array
        { new: true, runValidators: true } 
    )
    } catch (err) {
      res.status(500).json(err);
    }
}

const getOrder = async (req,res)=>{
    await OrderModel.find({}).populate('products.product')
    .then((order)=>res.json(order))
    .catch(err => res.status(500).json(err));
}

const getOrderById = async (req,res)=>{
    const id = req.params.id
    await OrderModel.findById({_id:id}).populate('products.product')
    .then((order)=>res.json(order))
    .catch(err => res.status(500).json(err));
}

const editOrderById = async (req,res)=>{
    const id = req.params.id
    await OrderModel.findByIdAndUpdate({_id:id},{
        status:req.body.status,
        deliveryDate:req.body.date
    })
    .then((order)=>res.json(order))
    .catch(err => res.status(500).json(err));
}

const deleteOrderById =  async (req,res)=>{
    const id = req.params.id
    await OrderModel.findByIdAndDelete({_id:id})
    .then((order)=>res.json(order))
    .catch(err => res.status(500).json(err));
}

module.exports = {
    createOrder,
    storeOrder,
    getOrder,
    getOrderById,
    editOrderById,
    deleteOrderById,
}
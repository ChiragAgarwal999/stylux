const express = require('express');
const router = express.Router();
const {createCart,getCart,updateCart} = require("../controller/cartCtrl")

//cart route
router.post("/:id",createCart);
router.get("/:id",getCart );
router.put("/:id",updateCart );

module.exports = router;  

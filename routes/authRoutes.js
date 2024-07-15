const express = require('express');
const router = express.Router();
const {upload,uploadCrousal} = require('../config/multer')
const {registerUser,loginUser,logoutUser,getAllUser,getUserById,getUserByEmail,getUserByEmailForOrders,editUserForAdmin,forgotPassword,editUserByEmailForAddress,} = require("../controller/userCtrl")
const {createProduct,getProduct,getProductById,editProductStock,editProductById,deleteProductById} = require("../controller/productCtrl")
const {createOrder,storeOrder,getOrder,getOrderById,editOrderById,deleteOrderById} = require("../controller/orderCtrl")
const {getCategory,addCategory,deleteCategory} = require("../controller/categoryCtrl")
const {getCrousal,getCrousalByIdx,postCrousal,deleteCrousal,updateCrousalByIdx}  = require("../controller/crousalCtrl")


//user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout', logoutUser);

router.get("/getUser",getAllUser)
router.get("/getUser/:id",getUserById)
router.get("/getUserByEmail/:email", getUserByEmail);
router.get("/getUserByEmailForOrders/:email", getUserByEmailForOrders );

router.put("/editUser/:id", editUserForAdmin)
router.put("/forgotPassword/:email",forgotPassword)
router.put("/editUserByEmail/:email",editUserByEmailForAddress );

// product
router.post('/createProduct', upload.array('imageURL'), createProduct);
router.get("/getProduct",getProduct)
router.get("/getProduct/:id",getProductById)
router.put("/editProductStock/:id",editProductStock)
router.put("/editProduct/:id", upload.array('imageURL'),editProductById);
router.delete("/deleteProduct/:id",deleteProductById)

//orders
router.post("/createOrder",createOrder );
router.put("/storeOrder/:email",storeOrder );
router.get("/getOrder",getOrder )
router.get("/getOrder/:id",getOrderById )
router.put("/editOrder/:id",editOrderById )
router.delete("/deleteOrder/:id",deleteOrderById)

//Category
router.get("/getCategory",getCategory)
router.post("/addCategory",addCategory)
router.put("/deleteCategory", deleteCategory)

//Crousal
router.get("/getCrousal",getCrousal)
router.get("/getCrousal/:idx", getCrousalByIdx )
router.post("/postCrousal", uploadCrousal.single('file'),postCrousal);
router.put("/deleteCrousal", deleteCrousal )
router.put("/updateCrousal/:idx",uploadCrousal.single('file'), updateCrousalByIdx)


module.exports = router;  
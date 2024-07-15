const CategoryModel = require("../models/Category")

const getCategory = async(req,res)=>{
    await CategoryModel.findOne()
    .then(category => res.json(category.category))
    .catch((err) => res.json(err.message));
}

const addCategory = async(req,res)=>{
    let {cat} = req.body
    let category = await CategoryModel.findOne();
    try{
        if(category){
            let arr = category.category;
            let bol = arr.find((el)=>el==cat)
            if(!bol && cat){
                category = await CategoryModel.findOneAndUpdate({},
                    { category: [...arr, cat] },
                    { new: true } // Return the updated document
                );
            }
        }else{
            if(cat!=null){
                category = await CategoryModel.create({category:[cat]})
            }else{
                category = await CategoryModel.create({category:[]})
            }
        }
        return res.json(category)
    }catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

const deleteCategory =  async(req,res)=>{
    let {cat} = req.body
    let category = await CategoryModel.findOne();
    try{
        if(category){
            let arr = category.category;
            let newArr = arr.filter((el)=>el!=cat)
                category = await CategoryModel.findOneAndUpdate({},
                    { category: [...newArr] },
                    { new: true }
                );
        }else{
            category = await CategoryModel.create({category:[]})
        }
        return res.json(category)
    }catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
}
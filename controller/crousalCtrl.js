const CrousalModel = require('../models/Crousal');

const getCrousal = async (req, res) => {
    CrousalModel.findOne({})
    .then(data=>
    res.json(data))
.catch (err=>
    res.status(500).json(err.message ))  
}

const getCrousalByIdx = async (req, res) => {
    let idx= req.params.idx
    CrousalModel.findOne({})
    .then(data=>
    res.json(data.crousalData[idx]))
.catch (err=>
    res.status(500).json(err.message ))  
}

const deleteCrousal = async (req, res) => {
    const idx = req.body.idx;
    CrousalModel.findOne({})
    .then((data)=>{
        data.crousalData.splice(idx, 1)
        return CrousalModel.findOneAndUpdate({}, { crousalData: data.crousalData }, { new: true })
    }
    )
    .then(updatedData=>res.json(updatedData))

.catch ((err)=>
    res.status(500).json(err.message ))  
}

const updateCrousalByIdx = async (req, res) => {
    const {idx} = req.params;
    CrousalModel.findOne({})
    .then((data)=>{
        let updatedCrousal = {
            title: req.body.title,
            description: req.body.description,
        };
        if (req.file) {
            updatedCrousal.crousalImg = req.file.filename;
        }else{
            updatedCrousal.crousalImg = data.crousalData[idx].crousalImg;
        }
        // Update the specific item at index idx
        data.crousalData[idx] = updatedCrousal;
        return CrousalModel.findOneAndUpdate({}, { crousalData: data.crousalData }, { new: true })
    }
    )
    .then(updatedData=>res.json(updatedData))

.catch ((err)=>
    res.status(500).json(err.message ))  
}

const postCrousal =  async (req, res) => {
    try {
        let crousal = await CrousalModel.findOne({});
        if (crousal) {
            await CrousalModel.findOneAndUpdate(
                {}, 
                { $push: { crousalData: {
                        title: req.body.title,
                        description: req.body.description,
                        crousalImg: req.file.filename
                    }
                }},
                { new: true }
            );
        } else {
            await CrousalModel.create({
                crousalData: [{
                    title: req.body.title,
                    description: req.body.description,
                    crousalImg: req.file.filename
                }]
            });
        }
        res.status(200).json({ message: "Crousal data updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getCrousal,
    getCrousalByIdx,
    deleteCrousal,
    updateCrousalByIdx,
    postCrousal
}
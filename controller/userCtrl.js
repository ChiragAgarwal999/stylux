const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User'); // Adjust path as necessary


const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with the same email or phone number.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            isAdmin: false,
            orders: [],
            address:{},
        });
        const token = jwt.sign({ email: user.email, phone: user.phone, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
        // res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
        return res.json(token);
    } catch (err) {
        // console.error('Registration error:', err);
        return res.status(500).json(err.message);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json('User not exist');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ email: user.email, name: user.name, phone: user.phone, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
            // return res.cookie('token', token, { httpOnly: true });
            return res.json(token);
        } else {
            return res.json('Password is incorrect');
        }
    } catch (err) {
        // console.error('Login error:', err);
        return res.status(500).json({ error: 'Login failed. Please try again.' });
    }
}

const logoutUser = (req, res) => {
    return res.json('Success');
}

const getAllUser = async (req,res)=>{
    await UserModel.find({})
    .then((user)=>res.json(user))
    .catch(err => res.status(500).json(err));
}

const getUserById =  async (req,res)=>{
    const id = req.params.id
    await UserModel.findById({_id:id})
    .then((user)=>res.json(user))
    .catch(err => res.status(500).json(err));
}

const getUserByEmail = async (req, res) => {
    const email = req.params.email;

    await UserModel.findOne({ email: email })
    .then((user)=>res.json(user.address))
    .catch(err => res.status(500).json(err));
}

const getUserByEmailForOrders = async (req, res) => {
    const email = req.params.email;

    await UserModel.findOne({ email: email }).populate({
        path: 'orders',
        populate: {
          path: 'products.product'
        }
      })
    .then((user)=>res.json(user.orders))
    .catch(err => res.status(500).json(err));
}

const editUserForAdmin =  async (req,res)=>{
    const id = req.params.id
    await UserModel.findByIdAndUpdate({_id:id},{
        isAdmin:req.body.isAdmin,
    })
    .then((user)=>res.json(user))
    .catch(err => res.status(500).json(err));
}

const forgotPassword = async (req,res)=>{
    const email = req.params.email
    const {pass} = req.body
    bcrypt.hash(pass, 10)
    .then((hashPassword)=>{
        return UserModel.findOneAndUpdate(
            {email:email},
            {password:hashPassword},
            { new: true }
        )
    }).then(user => {
      if (user) {
        res.json("Password updated successfully");
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => res.status(500).json(err));
}

const editUserByEmailForAddress = async (req, res) => {
    const email = req.params.email;
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: email },
            { address: req.body},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getAllUser,
    getUserById,
    getUserByEmail,
    getUserByEmailForOrders,
    editUserForAdmin,
    forgotPassword,
    editUserByEmailForAddress,
}
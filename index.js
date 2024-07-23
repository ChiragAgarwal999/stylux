const express = require("express");
const dbConnect = require('./config/db.Connect');
const dotenv =require('dotenv').config();
const cors = require("cors");
// const cookieParser = require('cookie-parser');
const multer = require("multer");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB Connection
dbConnect();

// Middleware
app.use(express.json());
// app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true }));
app.use(cors({ origin: 'https://stylux-gycx.onrender.com', credentials: true }));

// app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());



// Routes
const authRoutes = require('./routes/authRoutes');
app.use("/",authRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use("/cart",cartRoutes);

const emailRoutes = require('./routes/emailRoutes');
app.use("/email",emailRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

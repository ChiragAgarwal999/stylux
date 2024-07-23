const express = require("express");
const dbConnect = require('./config/db.Connect');
const dotenv = require('dotenv').config();
const cors = require("cors");
// const cookieParser = require('cookie-parser');
const multer = require("multer");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB Connection
dbConnect();

// Allowed origins
const allowedOrigins = [
  'https://stylux-gycx.onrender.com',
  'https://stalwart-starburst-527e56.netlify.app'
];

// Middleware
app.use(express.json());

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use("/", authRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use("/cart", cartRoutes);

const emailRoutes = require('./routes/emailRoutes');
app.use("/email", emailRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const transporter = require("../config/nodemailer")
const jwt = require('jsonwebtoken');

router.post("/verification", async(req, res) => {
    const generateOtp = () => {
        const otp = Math.ceil(Math.random() * 10000);
        if (String(otp).length === 4) {
          return otp;
        } else {
          return generateOtp();
        }
      };  

    const mess = generateOtp();
    const { email, subject } = req.body;
    currentToken = null;
    try{
        const info = await transporter.sendMail({
            from: 'agarwalchirag999@gmail.com',
            to: email,
            subject:subject,
            text:`Your otp is ${mess} .It will expire after 3 min`,
          });  
          console.log("Message sent: %s", info.messageId);
          const token = jwt.sign({otp:mess}, process.env.JWT_Email_SECRET, { expiresIn: "3m" });
          currentToken = token;
          return res.json({ success: true,currentToken, message: "Email sent successfully"});
    }catch(e){
        res.send(email)
    }
  });
router.post("/placeOrder", async(req, res) => {
    const { email, subject ,message} = req.body;
    try{
        const info = await transporter.sendMail({
            from: 'agarwalchirag999@gmail.com',
            to: email,
            subject:subject,
            text:`${message}`,
          });  
          console.log("Message sent: %s", info.messageId);
          res.json("Success");
    }catch(e){
        res.send(email)
    }
  });

  module.exports = router;  
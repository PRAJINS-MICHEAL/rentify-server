const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

//@desc register user
//@route POST /register
//access public

const register = asyncHandler(async (req , res )=>{

    const {firstName , lastName , email , phone , password}=req.body;

    if(!firstName || !lastName || !phone || !email || !password)
    {
        res.status(400).json({ message: "All data are mandatory." });
        throw new Error("All data are mandatory.")
    }
    const userAvailable = await User.findOne({ email })

    if(userAvailable)
    {
        res.status(400).json({ message: "Email already in use." });
        throw new Error("Email already in use.")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create(
        {
            firstName,
            lastName,
            email,
            phone,
            password:hashedPassword,
        }
    );

    if(user){
        res.status(201).json({_id:user.id , name:user.username })
    }
    else{
        res.status(400);
        throw new Error("Invalid Data .")
    }


    console.log("Registeration Successfull")
})

//@desc login user
//@route POST /login
//access public

const login = asyncHandler(async(req , res )=>{

    const {email , password}=req.body;

    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password,user.password)) )
    {
        const accessToken = jwt.sign(
        {
            user:{
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                phone:user.phone,
                id:user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"90m"
        }
        );
        res.json({accessToken});
        
    }
    else{
        res.status(401);
        throw new Error("Invalid Credentials.")
    }
    console.log("Login Successfull")
})




const current = asyncHandler(async(req , res )=>{
    res.json(req.user)
})


const getUser = asyncHandler(async (req, res) => {

    const id = req.params;

    if(!id)
    {
        res.status(404).json("ID not found")
        throw new Error("ID not found.")
    }

    const user = await User.findById(id.userId);

    // console.log(user);

    if(!user)
    {
        res.status(404).json("User not found")
        throw new Error("User not found.")
    }

    res.status(201).json(user);

});



const nodemailer = require('nodemailer');

const mail = asyncHandler(async (req, res) => {

    const currentUserId = req.user.id;

    const { propertyUserId } = req.body;

    const propertyUser = await User.findById(propertyUserId);
    const currentUser = await User.findById(currentUserId);

    const propertyUserEmail = propertyUser.email;
    const currentUserEmail = currentUser.email;


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "2004.prajins@gmail.com",
          pass: process.env.PASSWORD,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET
        }
      });

    var mailToSeller = {
    from: '2004.prajins@gmail.com',
    to: propertyUserEmail,
    subject: 'Rentify - Property Viewed',
    text: `Someone have shown interest on your property. \n Their details are listed below. \n Name :${currentUser.firstName} ${currentUser.lastName}\n Email :${currentUser.email}\nPhone :${currentUser.phone}`
    };  

    var mailToBuyer = {
    from: '2004.prajins@gmail.com',
    to: currentUserEmail,
    subject: 'Rentify - Property Viewed',
    text: `You have shown interest on someone's property. \n Their details are listed below. \n Name :${propertyUser.firstName} ${propertyUser.lastName}\n Email :${propertyUser.email}\nPhone :${propertyUser.phone}`
    };  

    transporter.sendMail(mailToSeller, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    transporter.sendMail(mailToBuyer, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });  


    res.status(201).json("Mail sent successfully.")
    


})

module.exports={register , login , current , getUser , mail}
const User = require("../models/user.model");
const sendEmail  = require('../utils/sendEmail');
const bcrypt = require("bcryptjs");
const path = require("path");
const register = async (req, res) => {
  try {
    console.log("Authentication Backend");
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user){
      console.log("already");
      return res.status(400).send({err: true,message: "User with that email already exists!" })
    }

    user = await User.create(req.body);
    console.log("Successfully registered!");
    return res.status(201).send({username:user.name,err: false, message: "Successfully registered!" });
  } catch (err) {
    return res.send({err:err.message});
  }
};

const login = async (req,res)=>{
    try{
       let user = await User.findOne({email: req.body.email});

       if(!user) return res.status(400).send({err: true,message: "User not exist!"})

       let match = user.checkPassword(req.body.password)
       if(!match) {
         return res.status(400).send({err: true,message: 'Either email or password is incorrect!'})
       }
       return res.status(201).send({username: user.name,err: false,message: 'Successfully Login!'})
    }
    catch(err){
      console.log("err:",err);
    }
}

const editprofile = async (req,res) => {
  try{
    let user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send({err: true,message: "User not exist!"})

    let match = user.checkPassword(req.body.password)
    if(!match) {
      return res.status(400).send({err: true,message: 'Either email or password is incorrect!'})
    }
    user = await User.findByIdAndUpdate({_id: user._id},{email:req.body.email,name:req.body.name,password:user.password},{new: true})
    return res.status(201).send({username:user.name,err:false, message: "Successfully Updated!"})
 }
 catch(err){
   console.log("err:",err);
 }
}

const sendEmailFunc = async (req,res) => {
  try {
    const user =await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({err:true, message: "User not Exist!"})
    console.log("user mail:",user);
    otp = Math.floor(1000 + Math.random() * 9000)
    sendEmail(
      "admin@sowedane.com",
      user.email, 
      "Reset your Password",
      `${otp} Please verify!`,    
      null,
      null,
      null,
    );
    return res.status(201).send({username:user.name,email: user.email,otp:otp,err:false, message: "OTP sent on your mail!"});
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

// Update password
const updatePassword = async (req,res)=>{
  try{
    console.log(8181818181);
    let user =await User.findOne({email: req.body.email});
    console.log('user update!',user);
    let password = bcrypt.hashSync(req.body.password, 8);
    user = await User.findByIdAndUpdate({_id: user._id},{password:password},{new: true})
    console.log('upadte: ',user);
    return res.status(201).send({err:false, message:'Password reset Successfully!'})
  }
  catch(err){
    console.log('resetpasswordErr:',err);
  }
}
module.exports = { register, login ,editprofile, sendEmailFunc, updatePassword};

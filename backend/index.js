const {register, login, editprofile,sendEmailFunc,updatePassword} = require("./controllers/authcontroller");
const express = require("express");

const app = express();
app.use(express.json());

app.post('/register',register)
app.post('/login',login)
app.patch('/editprofile',editprofile)
app.post('/sendEmail',sendEmailFunc)
app.patch('/resetpassword',updatePassword)
module.exports = app;
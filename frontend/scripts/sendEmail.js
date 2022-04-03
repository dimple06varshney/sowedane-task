import errorMessage from "./errorMessage.js";
import isEmail from './isEmail.js'
let sendBtn = document.getElementById('loginBtn')

sendBtn.addEventListener('click', async ()=>{
    try{
       const email = document.getElementById(`email`).value;
       if (email === "") {
        errorMessage(true,"Please enter all details!")
        return;
      } 
      else if(!isEmail(email)){
        errorMessage(true,"Email is not Valid!");
        return;
      }
      
      let login_data = {
        email: email,
      };
      login_data = JSON.stringify(login_data);
      let login_api = 'http://localhost:2545/sendEmail'

        var response = await fetch(login_api, {
        method: "POST",
        body: login_data,
        headers: {
          "Content-Type": "application/json",
        },
      });
     let res =await response.json()
     if(!res.err) {
      errorMessage(false,res.message)
      sessionStorage.setItem("otp",res.otp)
      sessionStorage.setItem('email',res.email) 
      window.location.href = 'otp.html'
    }
    else errorMessage(true,res.message)
    }
    catch(er){
        console.log(er);
    }
})
import errorMessage from "./errorMessage.js";
import isEmail from "./isEmail.js";  
  const signUpBtn = document.getElementById(`signBtn`);
  signUpBtn.addEventListener("click", async (e) => {
    const email = document.getElementById("email").value;
    const name= document.getElementById('name').value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (email === "" || password === ""|| name==="" || confirmPassword === "") {
      errorMessage(true,"Please enter all details!")
      return;
    } 
    else if(!isEmail(email)){
      errorMessage(true,"Email is not Valid!");
      return;
    }
    else if (password != confirmPassword) {
      errorMessage(true,"The passwords you have entered do not match. Please try again!");
      return;
    } else if (password.length < 8 && password.length != 0) {
      errorMessage(true,"Password must be a minimum of 8 characters and cannot exceed 70 characters!");
      return;
    }
    let signup_data = {
      email: email,
      name:name,
      password: password,
    };
    signup_data = JSON.stringify(signup_data);
    let register_api = 'http://localhost:2545/register'
 
      try{
      var response = await fetch(register_api, {
      method: "POST",
      body: signup_data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json() 
    if(!data.err) {
      errorMessage(false,data.message)
      document.cookie = `username=${data.username}; expires=Thu, 30 June 2022 12:00:00 UTC`;
      window.location.href = 'index.html';
    }
    else errorMessage(true,data.message)
      }
      catch(err){
        console.log("err:",err);
      }
    
  });
  
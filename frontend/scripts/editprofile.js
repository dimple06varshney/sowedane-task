import errorMessage from '../scripts/errorMessage.js';
import isEmail from './isEmail.js';
const editBtn = document.getElementById(`signBtn`);
  editBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById('name').value;
    const password = document.getElementById("password").value;
    if (email === "" ||name==="" ||password === "") {
      errorMessage(true,"Please enter all details!")
      return;
    } 
    else if(!isEmail(email)){
      errorMessage(true,"Email is not Valid!");
      return;
    }
    let edit_data = {
      email: email,
      name:name,
      password: password,
    };
    edit_data = JSON.stringify(edit_data);
    let login_api = 'http://localhost:2545/editprofile'
 
      try{
      var response = await fetch(login_api, {
      method: "PATCH",
      body: edit_data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    console.log(data);
    if(!data.err) {
      errorMessage(false,data.message)
      document.cookie = `username=${data.username}; expires=Thu, 30 June 2022 12:00:00 UTC`;
      window.location.href = 'index.html'
    }
    else errorMessage(true,data.message)
      }
      catch(err){
        console.log("err:",err);
      }
    
  });
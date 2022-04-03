  import errorMessage from "./errorMessage.js";
  import isEmail from "./isEmail.js";

  const loginBtn = document.getElementById(`loginBtn`);
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "" || password === "") {
      errorMessage(true,"Please enter all details!")
      return;
    } 
    else if(!isEmail(email)){
      errorMessage(true,"Email is not Valid!");
      return;
    }
    let login_data = {
      email: email,
      password: password,
    };
    login_data = JSON.stringify(login_data);
    let login_api = 'http://localhost:2545/login'
 
      try{
      var response = await fetch(login_api, {
      method: "POST",
      body: login_data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
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
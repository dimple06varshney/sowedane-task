import errorMessage from "./errorMessage.js";

const email = sessionStorage.getItem('email');

const updateBtn = document.getElementById('signBtn')
updateBtn.addEventListener('click', async ()=>{
    try{
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        if(password==='' || confirmPassword===''){
            errorMessage(true,'Enter all details!')
            return
        }
        else if(password!== confirmPassword){
            errorMessage(true,'The passwords you have entered do not match. Please try again!')
            return;
        }
        let sendData = {
            email: email,
            password:password
        }
        sendData = JSON.stringify(sendData);
        const reset_api = 'http://localhost:2545/resetpassword'
        var response = await fetch(reset_api, {
            method: "PATCH",
            body: sendData,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json()
          if(!data.err) {
            errorMessage(false,data.message)
            window.location.href = 'login.html'
          }
          else errorMessage(true,data.message)
    }
    catch(err){
        console.log('Err: ',err);
    }
    
})

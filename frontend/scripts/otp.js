import errorMessage from "./errorMessage.js";

const otp = sessionStorage.getItem('otp')

const confirm = document.getElementById(`loginBtn`)
confirm.addEventListener('click', ()=>{
    let enterOtp = document.getElementById('otp').value;
    if(enterOtp===otp){
        window.location.href = 'newpassword.html'
    }
    else{
        errorMessage(true,'Wrong OTP!')
    }
})

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let data = decodedCookie.split(';');
    for(let i = 0; i <data.length; i++) {
      let c = data[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var loginOrEdit = document.getElementById(`loginOrEditProfile`)
  let username = getCookie("username");
  let logOut = document.getElementById(`logOut`);
  let orsign = document.getElementById(`orsign`);
  logOut.addEventListener('click',()=>{
    document.cookie = "username=; expires=Thu, 30 June 2022 12:00:00 UTC";
    window.location.href = 'index.html'
  })
  console.log(username);
if(username!== ""){
  logOut.style.display = 'block'; 
  orsign.style.display='none'; 
  const user = document.getElementById('username');
user.innerText = `Welcome ${username}`;
user.style.textTransform = "uppercase";
loginOrEdit.innerText = 'Edit Profile'
loginOrEdit.href = 'edit.html'  
}
else{
    logOut.style.display = 'none'; 
    orsign.style.display = 'block'
    loginOrEdit.innerText = 'log In'
    loginOrEdit.href = 'login.html'
}  

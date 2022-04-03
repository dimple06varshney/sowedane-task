let errorMessage = (err,msg) => {
    const errorDiv = document.querySelector("#errorMessage");
    errorDiv.style.display = "block";
    if(err) errorDiv.style.backgroundColor = 'rgb(244, 211, 211)';
    else errorDiv.style.backgroundColor = 'rgb(203, 244, 203)';
    errorDiv.innerText = msg;
    clearTimeout(id)
  var id= setTimeout(()=>{
       errorDiv.style.display = "none"; 
    },4000)
  };

export default errorMessage;  
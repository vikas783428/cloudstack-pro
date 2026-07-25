document.addEventListener("DOMContentLoaded",()=>{


const button=document.getElementById("theme-toggle");


const savedTheme=localStorage.getItem("theme");


if(savedTheme==="dark"){

document.body.classList.add("dark");

button.textContent="☀️";

}



button.addEventListener("click",()=>{


document.body.classList.toggle("dark");


if(document.body.classList.contains("dark")){


localStorage.setItem("theme","dark");

button.textContent="☀️";


}

else{


localStorage.setItem("theme","light");

button.textContent="🌙";


}


});


});
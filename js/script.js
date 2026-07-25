// Sticky Header Shadow on Scroll

window.addEventListener("scroll", () => {

const header = document.querySelector("header");

if(window.scrollY > 50){

header.style.boxShadow="0 10px 30px rgba(0,0,0,.1)";

}else{

header.style.boxShadow="0 5px 20px rgba(0,0,0,.05)";

}

});


// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener('click',function(e){

e.preventDefault();

document.querySelector(this.getAttribute('href')).scrollIntoView({

behavior:'smooth'

});

});

});
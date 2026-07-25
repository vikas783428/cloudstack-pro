const reveals=document.querySelectorAll(".reveal");


window.addEventListener("scroll",()=>{


reveals.forEach(section=>{


const windowHeight=window.innerHeight;

const revealTop=section.getBoundingClientRect().top;


if(revealTop < windowHeight - 100){

section.classList.add("active");

}


});


});
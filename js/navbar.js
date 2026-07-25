document.addEventListener("DOMContentLoaded",()=>{


const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelector(".nav-links");


console.log("Navbar JS Loaded");


if(menuToggle && navLinks){


menuToggle.addEventListener("click",()=>{


console.log("Menu clicked");


navLinks.classList.toggle("active");


});


}


});
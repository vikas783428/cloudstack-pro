document.addEventListener("DOMContentLoaded", function(){

const buttons = document.querySelectorAll(".read-more");

const modal = document.getElementById("infoModal");

const modalTitle = document.getElementById("modalTitle");

const modalText = document.getElementById("modalText");

const closeBtn = document.getElementById("closeModal");


console.log("Resources JS Loaded");


buttons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        console.log("Button clicked");


        modalTitle.textContent = this.dataset.title;

        modalText.textContent = this.dataset.info;


        modal.style.display = "flex";

    });

});


closeBtn.addEventListener("click",function(){

    modal.style.display="none";

});


window.addEventListener("click",function(e){

    if(e.target === modal){

        modal.style.display="none";

    }

});


});
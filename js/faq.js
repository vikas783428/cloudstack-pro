document.addEventListener("DOMContentLoaded",()=>{


const faqItems=document.querySelectorAll(".faq-item");


faqItems.forEach(item=>{


const button=item.querySelector(".faq-question");


button.addEventListener("click",()=>{


item.classList.toggle("active");


});


});


});
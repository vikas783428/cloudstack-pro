document.addEventListener("DOMContentLoaded",()=>{


const toggle = document.getElementById("priceToggle");

const prices = document.querySelectorAll(".price");


if(toggle){

toggle.addEventListener("change",()=>{


prices.forEach(price=>{


if(toggle.checked){

price.textContent="$"+price.dataset.year;

}

else{

price.textContent="$"+price.dataset.month;

}


});


});


}


});
const cards = document.querySelectorAll(".selectable");


cards.forEach(card=>{


card.addEventListener("click",()=>{


cards.forEach(item=>{

item.classList.remove("selected");

});


card.classList.add("selected");


});


});
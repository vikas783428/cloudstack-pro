const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

document.getElementById("successMessage").innerHTML =
"✅ Thank you! Your message has been sent successfully.";

form.reset();

});

}
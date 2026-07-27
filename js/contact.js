const form = document.getElementById("contactForm");
const successMessage = document.getElementById("success-message");


if (form) {

    form.addEventListener("submit", async function(e) {

        e.preventDefault();


        const emailInput = document.getElementById("email").value.trim();


        // Check duplicate email

        const submittedEmail = localStorage.getItem("submittedEmail");


        if(submittedEmail === emailInput){

            if(successMessage){

                successMessage.style.display = "block";

                successMessage.innerHTML =
                "⚠️ You have already submitted a request with this email.";

            }

            return;

        }



        const formData = new FormData(form);



        try {


            const response = await fetch(form.action, {

                method: "POST",

                body: formData,

                headers: {

                    "Accept": "application/json"

                }

            });



            if(response.ok){


                // Save email

                localStorage.setItem(
                    "submittedEmail",
                    emailInput
                );


                form.reset();



                if(successMessage){

                    successMessage.style.display = "block";

                    successMessage.innerHTML =
                    "✅ Your requirement has been submitted successfully. Our team will contact you soon.";

                }


            }

            else{


                if(successMessage){

                    successMessage.style.display = "block";

                    successMessage.innerHTML =
                    "❌ Submission failed. Please try again.";

                }


            }



        }

        catch(error){


            if(successMessage){

                successMessage.style.display = "block";

                successMessage.innerHTML =
                "❌ Network error. Please try again.";

            }


        }


    });


}
export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }


    try {

        const { message } = req.body;


        if (!message) {

            return res.status(400).json({

                reply:
                "Please enter a message."

            });

        }



        const response = await fetch(

            "https://api.groq.com/openai/v1/chat/completions",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization":
                    `Bearer ${process.env.GROQ_API_KEY}`

                },


                body: JSON.stringify({

                    model:
                    "llama-3.1-8b-instant",


                    messages: [

                        {

                            role: "system",

                            content:
                            "You are CloudStack Pro AI assistant. Help users with cloud services, DevOps, Kubernetes, and company information."

                        },

                        {

                            role: "user",

                            content: message

                        }

                    ]

                })

            }

        );



        const data = await response.json();



        console.log(
            "Groq Response:",
            JSON.stringify(data)
        );



        const reply =

        data.choices?.[0]?.message?.content

        ||

        "AI service is temporarily unavailable. Please try again later. 🤖";



        res.status(200).json({

            reply

        });



    } catch(error) {


        console.error(
            "Groq Error:",
            error
        );


        res.status(500).json({

            reply:
            "AI service is temporarily unavailable. Please try again later. 🤖"

        });


    }

}
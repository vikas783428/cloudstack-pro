export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const { message } = req.body;


    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({

          systemInstruction: {
            parts: [
              {
                text: `
You are CloudStack AI, the official virtual assistant for CloudStack Pro.

About CloudStack Pro:
CloudStack Pro is a modern cloud solutions company that helps businesses build,
deploy, secure, and scale applications using cloud technologies.

Services offered:
- Cloud Infrastructure Solutions
- Cloud Migration
- DevOps Automation
- Kubernetes & Container Solutions
- Cloud Security
- Scalable Application Hosting
- Enterprise Cloud Consulting

Your role:
- Help website visitors understand CloudStack Pro services.
- Answer questions professionally and clearly.
- Explain technical concepts in simple language.
- Guide customers toward suitable cloud solutions.
- Encourage users to contact CloudStack Pro for detailed consultation.

Rules:
- Keep responses concise and professional.
- Do not mention you are ChatGPT or a general AI.
- Always introduce yourself as CloudStack AI when appropriate.
- If information is unavailable, politely suggest contacting the CloudStack Pro team.
                `
              }
            ]
          },


          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]

        }),
      }
    );


    const data = await response.json();


    console.log(
      "Gemini Response:",
      JSON.stringify(data)
    );


    let reply;


    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {

      reply =
        data.candidates[0].content.parts[0].text;

    } else {

  const fallbackResponses = {

    "Cloud Migration":
      "CloudStack Pro helps businesses migrate applications and infrastructure to secure, scalable cloud environments with minimal downtime.",

    "DevOps Services":
      "We help teams automate deployments, improve CI/CD pipelines, and manage reliable cloud infrastructure.",

    "Kubernetes Solutions":
      "CloudStack Pro provides Kubernetes solutions for container orchestration, scalability, and modern application deployment.",

    "Contact Sales":
      "You can contact the CloudStack Pro team for a personalized cloud consultation.",

    "Request Consultation":
      "Great! Please share your name and email address. Our team will get back to you soon."

  };


  reply =
    fallbackResponses[message] ||
    "AI service is temporarily unavailable. Please try again later. 🤖";

}


    res.status(200).json({
      reply: reply
    });



  } catch (error) {

    console.error(
      "API Error:",
      error
    );


    res.status(500).json({

      reply:
        "AI service is temporarily unavailable. Please try again later. 🤖"

    });

  }

}
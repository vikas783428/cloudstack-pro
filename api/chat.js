export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {

            return res.status(400).json({
                reply: "Please enter a message."
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

                    model: "llama-3.1-8b-instant",

                    messages: [

                        {
                            role: "system",

                            content: `
You are CloudStack Pro AI, the official AI assistant for the CloudStack Pro website.

IMPORTANT:
CloudStack Pro is a cloud services company represented by this website.
It is NOT Apache CloudStack.
Never describe CloudStack Pro as Apache CloudStack.

CloudStack Pro provides the following services:

1. Cloud Hosting
- High-performance cloud infrastructure
- 99.99% uptime SLA
- Automatic backups
- Global data centers

2. DevOps Automation
- CI/CD pipelines
- Docker
- Kubernetes orchestration
- Automated deployments

3. AI Monitoring
- AI-powered monitoring
- Real-time alerts
- Predictive analytics
- Anomaly detection

4. Security Suite
- Firewall protection
- SSL encryption
- DDoS protection
- Threat detection

5. Analytics Dashboard
- Infrastructure monitoring
- Performance reports
- Resource tracking
- Business metrics

6. Global CDN
- Worldwide content delivery
- High-speed caching
- Lower latency
- Optimized routing

Your job is to help visitors understand CloudStack Pro and its services.

Answer questions clearly, professionally, and concisely.

If the user asks "What is CloudStack Pro?", explain that CloudStack Pro is a cloud solutions platform that provides cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN services.

If the user asks about products or services, use only the CloudStack Pro information provided above.

If the user asks about pricing, do not invent prices. Tell them to visit the Pricing page or contact the sales team for current pricing.

If the user asks about contacting the company, recommend the Contact page.

If the user asks about Apache CloudStack, explain that Apache CloudStack is a separate open-source project and should not be confused with CloudStack Pro.

Do not invent:
- Customers
- Partnerships
- Certifications
- Pricing
- Company statistics
- Guarantees
- Locations
- Awards
- Features that are not listed above

If you do not know something about CloudStack Pro, honestly say that you do not have that information.

For unrelated questions, politely explain that you are primarily designed to assist with CloudStack Pro and its services.

Keep responses helpful and reasonably short so the chatbot is easy to use.
`

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

        if (!response.ok) {

            console.error(
                "Groq API Error:",
                JSON.stringify(data)
            );

            return res.status(response.status).json({
                reply:
                "AI service is temporarily unavailable. Please try again later. 🤖"
            });

        }

        console.log(
            "Groq Response:",
            JSON.stringify(data)
        );

        const reply =
            data.choices?.[0]?.message?.content
            ||
            "AI service is temporarily unavailable. Please try again later. 🤖";

        return res.status(200).json({
            reply
        });

    } catch (error) {

        console.error(
            "Groq Error:",
            error
        );

        return res.status(500).json({
            reply:
            "AI service is temporarily unavailable. Please try again later. 🤖"
        });

    }

}
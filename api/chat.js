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


        const userMessage = message.trim().toLowerCase();


        // =========================================================
        // PREDEFINED ANSWERS
        // These answers DO NOT use Groq API requests/tokens.
        // Common questions are answered instantly.
        // =========================================================

        const predefinedAnswers = [

            // -----------------------------------------------------
            // GREETINGS
            // -----------------------------------------------------

            {
                keywords: [
                    "hello",
                    "hi",
                    "hey",
                    "good morning",
                    "good afternoon",
                    "good evening"
                ],

                answer:
                    "Hello! 👋 I'm the CloudStack Pro AI assistant. I can help you learn about our cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN services. What would you like to know?"
            },


            // -----------------------------------------------------
            // ABOUT CLOUDSTACK PRO
            // -----------------------------------------------------

            {
                keywords: [
                    "what is cloudstack pro",
                    "what is cloudstack",
                    "tell me about cloudstack pro",
                    "about cloudstack pro",
                    "about cloudstack"
                ],

                answer:
                    "CloudStack Pro is a cloud solutions platform providing cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN services."
            },


            // -----------------------------------------------------
            // SERVICES
            // -----------------------------------------------------

            {
                keywords: [
                    "what services do you offer",
                    "what services do you provide",
                    "services you offer",
                    "services you provide",
                    "your services",
                    "cloudstack pro services",
                    "list your services"
                ],

                answer:
                    "CloudStack Pro provides Cloud Hosting, DevOps Automation, AI Monitoring, Security Suite, Analytics Dashboard, and Global CDN services."
            },


            // -----------------------------------------------------
            // CLOUD HOSTING
            // -----------------------------------------------------

            {
                keywords: [
                    "cloud hosting",
                    "what is cloud hosting",
                    "cloud hosting service",
                    "cloud hosting services"
                ],

                answer:
                    "CloudStack Pro Cloud Hosting provides high-performance cloud infrastructure, 99.99% uptime SLA, automatic backups, and access to global data centers."
            },


            // -----------------------------------------------------
            // DEVOPS
            // -----------------------------------------------------

            {
                keywords: [
                    "devops",
                    "what is devops",
                    "devops automation",
                    "devops services",
                    "devops service"
                ],

                answer:
                    "CloudStack Pro DevOps Automation provides CI/CD pipelines, Docker, Kubernetes orchestration, and automated deployments to help streamline software delivery."
            },


            // -----------------------------------------------------
            // KUBERNETES
            // -----------------------------------------------------

            {
                keywords: [
                    "kubernetes",
                    "what is kubernetes",
                    "kubernetes solutions",
                    "kubernetes service",
                    "kubernetes services",
                    "k8s"
                ],

                answer:
                    "CloudStack Pro uses Kubernetes orchestration as part of its DevOps Automation services to help manage and automate containerized application deployments."
            },


            // -----------------------------------------------------
            // DOCKER
            // -----------------------------------------------------

            {
                keywords: [
                    "docker",
                    "what is docker",
                    "docker service",
                    "docker support"
                ],

                answer:
                    "Docker is included in CloudStack Pro's DevOps Automation services and can be used to package and run applications in containers."
            },


            // -----------------------------------------------------
            // AI MONITORING
            // -----------------------------------------------------

            {
                keywords: [
                    "ai monitoring",
                    "what is ai monitoring",
                    "monitoring",
                    "ai monitoring service",
                    "ai monitoring services"
                ],

                answer:
                    "CloudStack Pro AI Monitoring provides AI-powered monitoring, real-time alerts, predictive analytics, and anomaly detection."
            },


            // -----------------------------------------------------
            // SECURITY
            // -----------------------------------------------------

            {
                keywords: [
                    "security",
                    "security suite",
                    "cloud security",
                    "security services",
                    "security service",
                    "is cloudstack secure"
                ],

                answer:
                    "CloudStack Pro Security Suite includes firewall protection, SSL encryption, DDoS protection, and threat detection."
            },


            // -----------------------------------------------------
            // SSL
            // -----------------------------------------------------

            {
                keywords: [
                    "ssl",
                    "ssl encryption",
                    "do you provide ssl",
                    "ssl security"
                ],

                answer:
                    "Yes. SSL encryption is included as part of the CloudStack Pro Security Suite."
            },


            // -----------------------------------------------------
            // DDOS
            // -----------------------------------------------------

            {
                keywords: [
                    "ddos",
                    "ddos protection",
                    "do you provide ddos protection"
                ],

                answer:
                    "Yes. DDoS protection is included in the CloudStack Pro Security Suite."
            },


            // -----------------------------------------------------
            // ANALYTICS
            // -----------------------------------------------------

            {
                keywords: [
                    "analytics",
                    "analytics dashboard",
                    "what is analytics dashboard",
                    "performance reports",
                    "resource tracking"
                ],

                answer:
                    "CloudStack Pro Analytics Dashboard provides infrastructure monitoring, performance reports, resource tracking, and business metrics."
            },


            // -----------------------------------------------------
            // CDN
            // -----------------------------------------------------

            {
                keywords: [
                    "cdn",
                    "global cdn",
                    "what is cdn",
                    "global content delivery",
                    "content delivery"
                ],

                answer:
                    "CloudStack Pro Global CDN provides worldwide content delivery, high-speed caching, lower latency, and optimized routing."
            },


            // -----------------------------------------------------
            // CI/CD
            // -----------------------------------------------------

            {
                keywords: [
                    "ci cd",
                    "ci/cd",
                    "cicd",
                    "continuous integration",
                    "continuous deployment",
                    "deployment pipeline"
                ],

                answer:
                    "CloudStack Pro DevOps Automation includes CI/CD pipelines to help automate software building, testing, and deployment workflows."
            },


            // -----------------------------------------------------
            // CLOUD MIGRATION
            // -----------------------------------------------------

            {
                keywords: [
                    "cloud migration",
                    "cloud migration service",
                    "cloud migration services",
                    "can you migrate to cloud"
                ],

                answer:
                    "CloudStack Pro focuses on cloud solutions and infrastructure. For specific cloud migration requirements, please contact the sales team through the Contact page."
            },


            // -----------------------------------------------------
            // PRICING
            // -----------------------------------------------------

            {
                keywords: [
                    "pricing",
                    "price",
                    "prices",
                    "cost",
                    "how much",
                    "pricing plans",
                    "plans"
                ],

                answer:
                    "Pricing depends on the services and requirements of your project. Please visit the Pricing page or contact the CloudStack Pro sales team for current pricing."
            },


            // -----------------------------------------------------
            // CONTACT
            // -----------------------------------------------------

            {
                keywords: [
                    "contact",
                    "contact you",
                    "contact sales",
                    "contact the company",
                    "how can i contact",
                    "how do i contact",
                    "sales team",
                    "talk to sales"
                ],

                answer:
                    "You can contact the CloudStack Pro team through the Contact page on the website. The sales team can help with your specific requirements."
            },


            // -----------------------------------------------------
            // WHY CLOUDSTACK PRO
            // -----------------------------------------------------

            {
                keywords: [
                    "why cloudstack pro",
                    "why choose cloudstack pro",
                    "why should i choose cloudstack pro",
                    "why choose you"
                ],

                answer:
                    "CloudStack Pro brings cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN capabilities together to help businesses manage modern cloud infrastructure."
            },


            // -----------------------------------------------------
            // TECHNOLOGIES
            // -----------------------------------------------------

            {
                keywords: [
                    "technologies",
                    "technology do you use",
                    "technologies do you use",
                    "tech stack",
                    "technology stack"
                ],

                answer:
                    "CloudStack Pro services include technologies such as Docker, Kubernetes, CI/CD, cloud infrastructure, AI-powered monitoring, security tools, and global CDN capabilities."
            },


            // -----------------------------------------------------
            // UPTIME
            // -----------------------------------------------------

            {
                keywords: [
                    "uptime",
                    "99.99 uptime",
                    "99.99% uptime",
                    "uptime sla"
                ],

                answer:
                    "CloudStack Pro Cloud Hosting includes a 99.99% uptime SLA."
            },


            // -----------------------------------------------------
            // BACKUPS
            // -----------------------------------------------------

            {
                keywords: [
                    "backup",
                    "backups",
                    "automatic backups",
                    "does cloudstack provide backup"
                ],

                answer:
                    "Yes. Automatic backups are included with CloudStack Pro Cloud Hosting."
            },


            // -----------------------------------------------------
            // GLOBAL DATA CENTERS
            // -----------------------------------------------------

            {
                keywords: [
                    "data centers",
                    "datacenters",
                    "global data centers",
                    "where are your servers"
                ],

                answer:
                    "CloudStack Pro Cloud Hosting provides access to global data centers. For specific location information, please contact the CloudStack Pro team."
            },


            // -----------------------------------------------------
            // THANK YOU
            // -----------------------------------------------------

            {
                keywords: [
                    "thank you",
                    "thanks",
                    "thank"
                ],

                answer:
                    "You're welcome! 😊 I'm here if you have any questions about CloudStack Pro, cloud hosting, DevOps, Kubernetes, security, analytics, or CDN services."
            }

        ];


        // =========================================================
        // CHECK PREDEFINED ANSWERS FIRST
        // =========================================================

        for (const item of predefinedAnswers) {

            const matched = item.keywords.some(keyword =>
                userMessage.includes(keyword)
            );


            if (matched) {

                console.log(
                    "Predefined answer used:",
                    message
                );


                return res.status(200).json({

                    reply: item.answer,

                    source: "predefined"

                });

            }

        }


        // =========================================================
        // NO PREDEFINED ANSWER
        // SEND REQUEST TO GROQ
        // =========================================================

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


        // =========================================================
        // GROQ RESPONSE
        // =========================================================

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

            reply,

            source: "groq"

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
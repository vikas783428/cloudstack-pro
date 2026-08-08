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
        //
        // IMPORTANT:
        // We now use specific question patterns instead of simply
        // checking whether words like "kubernetes" exist.
        //
        // This means:
        //
        // "What is Kubernetes?"             -> FAQ
        // "Tell me about Kubernetes"        -> FAQ
        // "How can Kubernetes improve..."  -> GROQ
        //
        // This saves API usage while keeping complex questions AI.
        // =========================================================


        const predefinedAnswers = [

            // -----------------------------------------------------
            // GREETINGS
            // -----------------------------------------------------

            {
                patterns: [
                    /^hi$/,
                    /^hello$/,
                    /^hey$/,
                    /^hi there$/,
                    /^hello there$/,
                    /^hey there$/,
                    /^good morning$/,
                    /^good afternoon$/,
                    /^good evening$/
                ],

                answer:
                    "Hello! 👋 I'm the CloudStack Pro AI assistant. I can help you learn about our cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN services. What would you like to know?"
            },


            // -----------------------------------------------------
            // WHAT IS CLOUDSTACK PRO
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is cloudstack pro\??$/,
                    /^what's cloudstack pro\??$/,
                    /^tell me about cloudstack pro\.?$/,
                    /^about cloudstack pro\.?$/
                ],

                answer:
                    "CloudStack Pro is a cloud solutions platform providing cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN services."
            },


            // -----------------------------------------------------
            // SERVICES
            // -----------------------------------------------------

            {
                patterns: [
                    /^what services do you offer\??$/,
                    /^what services do you provide\??$/,
                    /^what are your services\??$/,
                    /^list your services\.?$/,
                    /^what services does cloudstack pro offer\??$/,
                    /^what services does cloudstack pro provide\??$/
                ],

                answer:
                    "CloudStack Pro provides Cloud Hosting, DevOps Automation, AI Monitoring, Security Suite, Analytics Dashboard, and Global CDN services."
            },


            // -----------------------------------------------------
            // CLOUD HOSTING
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is cloud hosting\??$/,
                    /^tell me about cloud hosting\.?$/,
                    /^what is your cloud hosting\??$/,
                    /^what does cloud hosting include\??$/,
                    /^what are your cloud hosting services\??$/
                ],

                answer:
                    "CloudStack Pro Cloud Hosting provides high-performance cloud infrastructure, 99.99% uptime SLA, automatic backups, and access to global data centers."
            },


            // -----------------------------------------------------
            // DEVOPS
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is devops\??$/,
                    /^tell me about devops\.?$/,
                    /^what is devops automation\??$/,
                    /^what are your devops services\??$/
                ],

                answer:
                    "CloudStack Pro DevOps Automation provides CI/CD pipelines, Docker, Kubernetes orchestration, and automated deployments to help streamline software delivery."
            },


            // -----------------------------------------------------
            // KUBERNETES
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is kubernetes\??$/,
                    /^what's kubernetes\??$/,
                    /^tell me about kubernetes\.?$/,
                    /^explain kubernetes\.?$/,
                    /^what are kubernetes solutions\??$/,
                    /^what is k8s\??$/,
                    /^tell me about k8s\.?$/
                ],

                answer:
                    "CloudStack Pro uses Kubernetes orchestration as part of its DevOps Automation services to help manage and automate containerized application deployments."
            },


            // -----------------------------------------------------
            // DOCKER
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is docker\??$/,
                    /^tell me about docker\.?$/,
                    /^what is docker used for\??$/
                ],

                answer:
                    "Docker is included in CloudStack Pro's DevOps Automation services and can be used to package and run applications in containers."
            },


            // -----------------------------------------------------
            // AI MONITORING
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is ai monitoring\??$/,
                    /^tell me about ai monitoring\.?$/,
                    /^what does ai monitoring do\??$/,
                    /^what is your ai monitoring service\??$/
                ],

                answer:
                    "CloudStack Pro AI Monitoring provides AI-powered monitoring, real-time alerts, predictive analytics, and anomaly detection."
            },


            // -----------------------------------------------------
            // SECURITY
            // -----------------------------------------------------

            {
                patterns: [
                    /^what security services do you provide\??$/,
                    /^what is your security suite\??$/,
                    /^tell me about your security\??$/,
                    /^what security features do you provide\??$/,
                    /^what security does cloudstack pro provide\??$/
                ],

                answer:
                    "CloudStack Pro Security Suite includes firewall protection, SSL encryption, DDoS protection, and threat detection."
            },


            // -----------------------------------------------------
            // SSL
            // -----------------------------------------------------

            {
                patterns: [
                    /^do you provide ssl\??$/,
                    /^do you provide ssl encryption\??$/,
                    /^what is ssl encryption\??$/
                ],

                answer:
                    "Yes. SSL encryption is included as part of the CloudStack Pro Security Suite."
            },


            // -----------------------------------------------------
            // DDOS
            // -----------------------------------------------------

            {
                patterns: [
                    /^do you provide ddos protection\??$/,
                    /^does cloudstack pro provide ddos protection\??$/,
                    /^what is ddos protection\??$/
                ],

                answer:
                    "Yes. DDoS protection is included in the CloudStack Pro Security Suite."
            },


            // -----------------------------------------------------
            // ANALYTICS
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is analytics dashboard\??$/,
                    /^tell me about analytics dashboard\.?$/,
                    /^what does the analytics dashboard do\??$/,
                    /^what is your analytics dashboard\??$/
                ],

                answer:
                    "CloudStack Pro Analytics Dashboard provides infrastructure monitoring, performance reports, resource tracking, and business metrics."
            },


            // -----------------------------------------------------
            // CDN
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is cdn\??$/,
                    /^what is global cdn\??$/,
                    /^tell me about global cdn\.?$/,
                    /^what does your global cdn do\??$/,
                    /^what is your cdn\??$/
                ],

                answer:
                    "CloudStack Pro Global CDN provides worldwide content delivery, high-speed caching, lower latency, and optimized routing."
            },


            // -----------------------------------------------------
            // CI/CD
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is ci\/cd\??$/,
                    /^what is ci cd\??$/,
                    /^what is cicd\??$/,
                    /^tell me about ci\/cd\.?$/,
                    /^what are ci\/cd pipelines\??$/
                ],

                answer:
                    "CloudStack Pro DevOps Automation includes CI/CD pipelines to help automate software building, testing, and deployment workflows."
            },


            // -----------------------------------------------------
            // PRICING
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is your pricing\??$/,
                    /^what are your prices\??$/,
                    /^how much does cloudstack pro cost\??$/,
                    /^how much does it cost\??$/,
                    /^what are your pricing plans\??$/,
                    /^tell me about your pricing\.?$/
                ],

                answer:
                    "Pricing depends on the services and requirements of your project. Please visit the Pricing page or contact the CloudStack Pro sales team for current pricing."
            },


            // -----------------------------------------------------
            // CONTACT
            // -----------------------------------------------------

            {
                patterns: [
                    /^how can i contact you\??$/,
                    /^how can i contact cloudstack pro\??$/,
                    /^how do i contact you\??$/,
                    /^how do i contact cloudstack pro\??$/,
                    /^how can i contact sales\??$/,
                    /^how do i contact sales\??$/,
                    /^where can i contact you\??$/
                ],

                answer:
                    "You can contact the CloudStack Pro team through the Contact page on the website. The sales team can help with your specific requirements."
            },


            // -----------------------------------------------------
            // WHY CLOUDSTACK PRO
            // -----------------------------------------------------

            {
                patterns: [
                    /^why cloudstack pro\??$/,
                    /^why choose cloudstack pro\??$/,
                    /^why should i choose cloudstack pro\??$/,
                    /^why choose cloudstack\??$/
                ],

                answer:
                    "CloudStack Pro brings cloud hosting, DevOps automation, AI monitoring, security, analytics, and global CDN capabilities together to help businesses manage modern cloud infrastructure."
            },


            // -----------------------------------------------------
            // TECHNOLOGIES
            // -----------------------------------------------------

            {
                patterns: [
                    /^what technologies do you use\??$/,
                    /^what technology do you use\??$/,
                    /^what is your tech stack\??$/,
                    /^what technologies does cloudstack pro use\??$/
                ],

                answer:
                    "CloudStack Pro services include technologies such as Docker, Kubernetes, CI/CD, cloud infrastructure, AI-powered monitoring, security tools, and global CDN capabilities."
            },


            // -----------------------------------------------------
            // UPTIME
            // -----------------------------------------------------

            {
                patterns: [
                    /^what is your uptime\??$/,
                    /^what uptime do you provide\??$/,
                    /^do you provide 99\.99% uptime\??$/,
                    /^what is the uptime sla\??$/
                ],

                answer:
                    "CloudStack Pro Cloud Hosting includes a 99.99% uptime SLA."
            },


            // -----------------------------------------------------
            // BACKUPS
            // -----------------------------------------------------

            {
                patterns: [
                    /^do you provide backups\??$/,
                    /^do you provide automatic backups\??$/,
                    /^does cloudstack pro provide backups\??$/,
                    /^does cloudstack pro provide automatic backups\??$/
                ],

                answer:
                    "Yes. Automatic backups are included with CloudStack Pro Cloud Hosting."
            },


            // -----------------------------------------------------
            // DATA CENTERS
            // -----------------------------------------------------

            {
                patterns: [
                    /^where are your data centers\??$/,
                    /^where are the data centers\??$/,
                    /^does cloudstack pro have global data centers\??$/
                ],

                answer:
                    "CloudStack Pro Cloud Hosting provides access to global data centers. For specific location information, please contact the CloudStack Pro team."
            },


            // -----------------------------------------------------
            // THANK YOU
            // -----------------------------------------------------

            {
                patterns: [
                    /^thank you$/,
                    /^thanks$/,
                    /^thank you so much$/,
                    /^thanks a lot$/
                ],

                answer:
                    "You're welcome! 😊 I'm here if you have any questions about CloudStack Pro, cloud hosting, DevOps, Kubernetes, security, analytics, or CDN services."
            }

        ];


        // =========================================================
        // CHECK PREDEFINED ANSWERS
        // =========================================================

        for (const item of predefinedAnswers) {

            const matched = item.patterns.some(pattern =>
                pattern.test(userMessage)
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
        // NO FAQ MATCH
        // SEND QUESTION TO GROQ
        // =========================================================

        console.log(
            "No predefined answer. Sending to Groq:",
            message
        );


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
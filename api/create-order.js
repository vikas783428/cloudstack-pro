import Razorpay from "razorpay";

const PLAN_PRICES = {
    Starter: 1599,
    Professional: 4099,
    Enterprise: 16599
};

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { plan } = req.body;

        if (!plan) {
            return res.status(400).json({
                error: "Plan is required"
            });
        }

        const amount = PLAN_PRICES[plan];

        if (!amount) {
            return res.status(400).json({
                error: "Invalid plan selected"
            });
        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay environment variables are missing.");

            return res.status(500).json({
                error: "Payment service is not configured"
            });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `cloudstack_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            plan: plan
        });

    } catch (error) {

        console.error("Razorpay Order Error:", error);

        return res.status(500).json({
            error: "Unable to create payment order"
        });

    }
}


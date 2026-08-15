import crypto from "crypto";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                error: "Missing payment verification details"
            });
        }

        if (!process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay secret is missing.");

            return res.status(500).json({
                success: false,
                error: "Payment verification is not configured"
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        const isValid = crypto.timingSafeEqual(
            Buffer.from(generatedSignature),
            Buffer.from(razorpay_signature)
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                error: "Payment signature verification failed"
            });
        }

        console.log(
            "Razorpay payment verified:",
            razorpay_payment_id
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id
        });

    } catch (error) {

        console.error(
            "Razorpay Verification Error:",
            error
        );

        return res.status(500).json({
            success: false,
            error: "Unable to verify payment"
        });
    }
}

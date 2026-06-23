const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const supabase = require("../supabase");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {

    try {

      const signature =
        req.headers["x-razorpay-signature"];

      const body = req.body;

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env.RAZORPAY_WEBHOOK_SECRET
          )
          .update(body)
          .digest("hex");

      if (signature !== expectedSignature) {
        return res.status(400).send("Invalid Signature");
      }

      const event =
        JSON.parse(body.toString());

      console.log("Razorpay webhook received:", event.event);

      if (
        event.event === "payment.captured"
      ) {

        const payment =
          event.payload.payment.entity;

        const orderId =
          payment.order_id;

        const paymentId =
          payment.id;

        const { data: transaction } =
          await supabase
            .from("transactions")
            .update({
              status: "success",
              razorpay_payment_id: paymentId
            })
            .eq(
              "razorpay_order_id",
              orderId
            )
            .select()
            .single();

        if (transaction) {

          await supabase
            .from("customers")
            .update({
              plan_type: "premium",
              updated_at:
                new Date()
            })
            .eq(
              "email",
              transaction.customer_email
            );
        }
      }

      console.log("Razorpay webhook processed successfully:", event.event);

      res.json({
        success: true
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message
      });

    }
  }
);

module.exports = router;

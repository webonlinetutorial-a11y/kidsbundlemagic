const express = require("express");
const router = express.Router();

const razorpay = require("../razorpay");
const supabase = require("../supabase");

router.post("/create-order", async (req, res) => {
  try {

    const customerName = String(req.body.name || "").trim();
    const customerEmail = String(req.body.email || "").trim().toLowerCase();
    const customerMobile = String(req.body.mobile || "").replace(/\D/g, "");
    const orderAmount = Number(req.body.amount);

    if (!customerName || !customerEmail || !customerMobile) {
      return res.status(400).json({
        error: "Name, email and mobile are required"
      });
    }

    const order = await razorpay.orders.create({
      amount: orderAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_mobile: customerMobile
      }
    });

    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        customer_email: customerEmail,
        razorpay_order_id: order.id,
        amount: orderAmount,
        status: "pending"
      });

    if (transactionError) {
      throw transactionError;
    }

    const { data, error: customerError } = await supabase
      .from("customers")
      .upsert(
        {
          name: customerName,
          email: customerEmail,
          mobile: customerMobile,
          plan_type: "free"
        },
        {
          onConflict: "email"
        }
      )
      .select();

    if (customerError) {
      throw customerError;
    }

    res.json({
      ...order,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
});

module.exports = router;

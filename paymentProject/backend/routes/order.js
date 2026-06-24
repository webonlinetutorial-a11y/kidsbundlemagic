const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const razorpay = require("../razorpay");
const supabase = require("../supabase");

const PRODUCT_DOWNLOAD_URL = process.env.PRODUCT_DOWNLOAD_URL;

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

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        error: "Payment verification details are required"
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        error: "Invalid payment signature"
      });
    }

    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .update({
        status: "success",
        razorpay_payment_id: razorpay_payment_id
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single();

    if (transactionError) {
      throw transactionError;
    }

    if (transaction) {
      const { error: customerError } = await supabase
        .from("customers")
        .update({
          plan_type: "premium",
          updated_at: new Date()
        })
        .eq("email", transaction.customer_email);

      if (customerError) {
        throw customerError;
      }
    }

    if (!PRODUCT_DOWNLOAD_URL) {
      throw new Error("Product download URL is not configured");
    }

    res.json({
      success: true,
      download_url: PRODUCT_DOWNLOAD_URL
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;

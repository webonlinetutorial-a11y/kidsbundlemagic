const checkoutTriggers = document.querySelectorAll("[data-checkout-trigger]");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutFormError = document.getElementById("checkoutFormError");
const checkoutSubmitBtn = document.getElementById("checkoutSubmitBtn");
const checkoutCloseButtons = document.querySelectorAll("[data-checkout-close]");

const setCheckoutError = (message = "") => {
  if (checkoutFormError) {
    checkoutFormError.textContent = message;
  }
};

const openCheckoutModal = () => {
  if (!checkoutModal) return;

  checkoutModal.classList.add("is-open");
  checkoutModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setCheckoutError();

  const firstInput = checkoutModal.querySelector("input");
  if (firstInput) {
    firstInput.focus();
  }
};

const closeCheckoutModal = () => {
  if (!checkoutModal) return;

  checkoutModal.classList.remove("is-open");
  checkoutModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const validateCustomer = ({ name, email, mobile }) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilePattern = /^[6-9]\d{9}$/;

  if (!name || name.length < 2) {
    return "Please enter your full name.";
  }

  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!mobilePattern.test(mobile)) {
    return "Please enter a valid 10 digit mobile number.";
  }

  return "";
};

const createPaymentOrder = async (customer) => {
  const response = await fetch("https://kidsbundlemagic-backend.onrender.com/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: 99,
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile
    })
  });

  if (!response.ok) {
    throw new Error("Unable to create payment order");
  }

  return response.json();
};

const openPaymentGateway = (order, customer) => {
  const options = {
    key: order.key_id,
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    name: "KidsBundleMagic",
    description: "Worksheet Bundle",
    prefill: {
      name: customer.name,
      email: customer.email,
      contact: customer.mobile
    },
    notes: {
      customer_name: customer.name,
      customer_email: customer.email,
      customer_mobile: customer.mobile
    },
    theme: {
      color: "#ff6b35"
    },
    handler(response) {
      alert("Payment Successful");
      console.log(response);
    }
  };

  const rzp = new Razorpay(options);

  rzp.on("payment.failed", (response) => {
    console.log("Payment Failed");
    console.log(response.error);
    alert(response.error.description || "Payment failed");
  });

  rzp.open();
};

checkoutTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCheckoutModal();
  });
});

checkoutCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCheckoutModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCheckoutModal();
  }
});

if (checkoutForm) {
  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setCheckoutError();

    const formData = new FormData(checkoutForm);
    const customer = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      mobile: String(formData.get("mobile") || "").replace(/\D/g, "")
    };

    const validationError = validateCustomer(customer);

    if (validationError) {
      setCheckoutError(validationError);
      return;
    }

    if (typeof Razorpay === "undefined") {
      setCheckoutError("Payment checkout is still loading. Please try again.");
      return;
    }

    try {
      if (checkoutSubmitBtn) {
        checkoutSubmitBtn.disabled = true;
        checkoutSubmitBtn.textContent = "Opening Payment...";
      }

      const order = await createPaymentOrder(customer);
      closeCheckoutModal();
      openPaymentGateway(order, customer);
    } catch (error) {
      console.log(error);
      setCheckoutError("Payment Error. Please try again.");
    } finally {
      if (checkoutSubmitBtn) {
        checkoutSubmitBtn.disabled = false;
        checkoutSubmitBtn.textContent = "Continue to Payment";
      }
    }
  });
}

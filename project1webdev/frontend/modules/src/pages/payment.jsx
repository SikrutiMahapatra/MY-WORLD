import API from "../api/api.js";

export default function Payment() {
  const handlePay = async () => {
    try {
      const res = await API.post("/api/payment/create-order", { amount: 199 });
      const order = res.data.order;

      const options = {
        key: "rzp_test_xxxxxxxx", 
        amount: order.amount,
        currency: order.currency,
        name: "Trello Pro",
        description: "Premium plan",
        order_id: order.id,
        handler: async function (response) {
          const verify = await API.post("/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          alert(verify.data.message);
        },
        theme: { color: "#026AA7" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment error");
    }
  };

  return (
    <div className="payment-page">
      <h2>Trello Pro Subscription</h2>
      <p>Unlock premium features for just ₹199.</p>
      <button onClick={handlePay}>Pay ₹199 with Razorpay</button>
    </div>
  );
}

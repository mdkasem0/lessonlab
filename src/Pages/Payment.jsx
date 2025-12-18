import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../Context/useAuth";

// Load Stripe with public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

// ---------------- Inner Checkout Form ----------------
const CheckoutForm = ({ amount }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent from backend
      const token = await user.getIdToken();

      const { data } = await axios.post(
        `${import.meta.env.VITE_ApiCall}/create-payment-intent`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const clientSecret = data.clientSecret;

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.paymentIntent.status === "succeeded") {
        navigate(`/payment/success?payment_intent=${result.paymentIntent.id}`);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
      navigate("/payment/cancel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="p-3 border rounded-lg"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#FBD536] hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

// ---------------- Main Payment Component ----------------
const Payment = ({ amount = 49 }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9EDE1] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Lifetime Access
        </h2>

        <p className="text-gray-600 mb-4">
          One-time payment for lifetime access. Secure checkout via Stripe.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold">Total: ${amount}</p>
          <p className="text-sm text-gray-500">No recurring charges</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>

        <p className="text-xs text-gray-400 text-center mt-4">
          🔒 Your card details are encrypted and securely processed by Stripe
        </p>
      </div>
    </div>
  );
};

export default Payment;

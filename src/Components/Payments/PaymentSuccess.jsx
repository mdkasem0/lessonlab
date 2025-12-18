import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const paymentIntentId = searchParams.get("payment_intent");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!paymentIntentId || !user?.accessToken) {
        toast.error("Invalid payment session");
        navigate("/payment/cancel");
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_ApiCall}/payment/confirm`,
          { paymentIntentId },
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
            withCredentials: true,
          }
        );

        toast.success("🎉 Premium access activated!");
      } catch (error) {
        toast.error("Payment verification failed");
        navigate("/payment/cancel");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [paymentIntentId, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9EDE1] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          You now have lifetime premium access.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-[#FBD536] hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

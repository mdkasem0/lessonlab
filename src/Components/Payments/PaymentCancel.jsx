import { XCircle } from "lucide-react";
import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9EDE1] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/payment-to-upgrade")}
            className="bg-[#FBD536] hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="border py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

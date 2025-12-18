import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/useAuth";
import Wraper from "../Components/Wraper";
import { UserUtils } from "../Utils/UserUtils";
import { toast } from "react-toastify";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";

const PricingUpgradePage = () => {
  const navigate = useNavigate();
  const [stateLoader, setLoading] = useState(false);
  const { loading, user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        setLoading(true)
        const token = await user.getIdToken(); // get Firebase token
        const data = await UserUtils.getCurrentUser(token); // fetch user from backend
        setLoggedUser(data);
        setLoading(false)
      } catch (err) {
        toast.error("Error fetching logged user:", err);
        setLoading(false)
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    // Redirect if user not logged in
    if (!user) {
      navigate("auth/login");
    }
  }, [user, navigate]);

  // Redirect to home if user already premium
  if (loggedUser?.isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Premium ⭐
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You already have full access to all lessons!
          </p>
        </div>
      </div>
    );
  }

  const handleUpgrade = async () => {
    navigate("payment-to-upgrade");
  };

  if (!loggedUser || loading) {
    return <LoaderSpainer />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <Wraper>
        <div className="container mx-auto ">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 dark:text-white text-center">
            Upgrade to Premium
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
            Unlock all premium lessons, save more, and enjoy an ad-free,
            personalized learning experience. Take your growth journey to the
            next level!
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-12">
            <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                    Features
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Free
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Number of Lessons Access
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Free Lessons Only
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Free + Premium Lessons
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Create Lessons
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Free Lessons Only
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Free + Premium Lessons
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Ad-Free Experience
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ❌
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ✅
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Priority Listing
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ❌
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ✅
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Save More Lessons
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Limited
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Access to Premium Insights
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ❌
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ✅
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Support / Help
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Standard
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Priority
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Lifetime Access
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ❌
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    ✅
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Stripe Checkout Button */}
          <div className="flex justify-center">
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Upgrade to Premium - ৳1500"}
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            One-time payment for lifetime access. Secure checkout via Stripe.
          </p>
        </div>
      </Wraper>
    </div>
  );
};

export default PricingUpgradePage;

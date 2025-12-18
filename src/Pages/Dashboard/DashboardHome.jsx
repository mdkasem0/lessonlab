import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { UserUtils } from "../../Utils/UserUtils";
import { useAuth } from "../../Context/useAuth";
import { toast } from "react-toastify";
import LoaderSpainer from "../../Components/Loader/LoaderSpainer";

const DashboardHome = () => {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const data = await UserUtils.getCurrentUser(token);
        setLoggedUser(data);
      } catch (err) {
        toast.error("Error fetching logged user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) {
    return <LoaderSpainer />;
  }
  if (!user) {
    return <Navigate to={"/register"} replace />;
  }
  if (loggedUser?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/dashboard/user" replace />;
};

export default DashboardHome;

import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PricingUpgradePage from "../Pages/PricingUpgradePage";
import PublicLessons from "../Pages/PublicLessons";
import LifeLessonDetailsPage from "../Pages/LifeLessonDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Profile";
import AddLesson from "../Pages/Dashboard/AddLesson";
import MyLessons from "../Pages/Dashboard/user/MyLesson";
import Favorites from "../Pages/Dashboard/user/Favorites";
import DashoardHomeUser from "../Pages/Dashboard/user/DashoardHomeUser";
import AdminDAshboardHome from "../Pages/Dashboard/AdminDAshboardHome";
import ManageUsers from "../Pages/Dashboard/admin/ManageUsers";
import ManageLessons from "../Pages/Dashboard/admin/ManageLesson";
import ReportedLessons from "../Pages/Dashboard/admin/ReportedLessons";
import ErrorPage from "../Pages/ErrorPage";
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/Payment";
import PaymentSuccess from "../Components/Payments/PaymentSuccess";
import PaymentCancel from "../Components/Payments/PaymentCancel";
import ProtectedRoutes from "./ProtectedRouts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      { path: "upgrade-plan", element: <ProtectedRoutes><PricingUpgradePage /> </ProtectedRoutes>},
      { path: "lisson/:id", element: <ProtectedRoutes><LifeLessonDetailsPage /> </ProtectedRoutes>},
      { path: "lessons", element: <PublicLessons /> },
      {
        path: "payment-to-upgrade",
        element: (
          <ProtectedRoutes>
            <Payment />
          </ProtectedRoutes>
        ),
      },
      {
        path: "payment/success",
        element: (
          <ProtectedRoutes>
            <PaymentSuccess />
          </ProtectedRoutes>
        ),
      },
      {
        path: "payment/cancel",
        element: (
          <ProtectedRoutes>
            <PaymentCancel />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "user", element: <DashoardHomeUser /> },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDAshboardHome />
          </AdminRoute>
        ),
      },
      { path: "admin/manage-users", element: <ManageUsers /> },
      { path: "admin/manage-lessons", element: <ManageLessons /> },
      { path: "admin/reported-lessons", element: <ReportedLessons /> },
      { path: "profile", element: <Profile /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
]);

export default router;

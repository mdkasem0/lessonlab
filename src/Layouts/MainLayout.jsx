import React from "react";
import Navbar from "../Components/navbar";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import Wraper from "../Components/Wraper";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="bg-base-100 shadow-sm sticky top-0 z-50">
        <Wraper>
          <Navbar />
        </Wraper>
      </div>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer/>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;

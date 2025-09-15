import React from "react";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

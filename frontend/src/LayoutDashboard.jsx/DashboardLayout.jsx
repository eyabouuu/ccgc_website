import React from "react";
import { Header } from "../components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex ">
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
       <Header />
        {/* Page Content */}
        <main className="flex-1 ">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, X, Menu, LogOut } from "lucide-react";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-gray-900 px-4 md:px-6 shadow-md text-white">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 border rounded-md bg-gray-800 hover:bg-gray-700"
      >
        <Menu className="h-5 w-5 text-white" />
        <span className="sr-only">Toggle Menu</span>
      </button>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <FaMoneyBillWheat />
        </div>
        <span className="hidden md:inline">SMCSA "GC".</span>
      </Link>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50" onClick={() => setIsSidebarOpen(false)}>
          <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 shadow-lg p-4 text-white">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 border rounded-md bg-gray-800 hover:bg-gray-700 mb-4 flex items-center gap-2"
            >
              <X className="h-5 w-5 text-white" /> Close
            </button>
            <nav className="space-y-2 text-sm font-medium">
              {/* Links for Admin */}
              {user?.role === "admin" && (
                <>
                  <NavItem
                    to="/dashboard"
                    icon={<Home className="h-4 w-4" />}
                    label="Dashboard"
                    active={location.pathname === "/dashboard"}
                  />
                  <NavItem
                    to="/dashboard/users"
                    icon={<Users className="h-4 w-4" />}
                    label="Users"
                    active={location.pathname.startsWith("/dashboard/users")}
                  />
                  <NavItem
                    to="/powerbi"
                    icon={<Package className="h-4 w-4" />}
                    label="Power BI"
                    active={location.pathname === "/powerbi"}
                  />
                </>
              )}

              {/* Links for Sub-Admin */}
              {user?.role === "sub-admin" && (
                <NavItem
                  to="/dashboard"
                  icon={<Home className="h-4 w-4" />}
                  label="Dashboard"
                  active={location.pathname === "/dashboard"}
                />
              )}

              {/* Logout Link */}
              <NavItem
                to="/"
                icon={<LogOut className="h-4 w-4" />}
                label="Logout"
                onClick={handleLogout}
              />
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}

const NavItem = ({ to, icon, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md ${active ? "bg-gray-300" : "hover:bg-gray-200"}`}
  >
    {icon}
    {label}
  </Link>
);



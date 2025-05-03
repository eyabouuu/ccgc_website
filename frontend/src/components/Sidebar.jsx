import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, CreditCard, FileText, Home, Package, Settings, ShoppingCart, Truck, Users } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex h-full flex-col border-r bg-gray-100 w-64">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-800">
          <Package className="h-6 w-6" />
          <span>Cereal Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-2 px-4 text-sm font-medium">
          <NavItem to="/" icon={<Home className="h-4 w-4" />} label="Dashboard" active={location.pathname === "/"} />
          <NavItem to="/powerbi" icon={<BarChart3 className="h-4 w-4" />} label="Power BI" active={location.pathname === "/powerbi"} />
          <NavItem to="/users" icon={<Users className="h-4 w-4" />} label="Users" active={location.pathname.startsWith("/users")} />

        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex items-center gap-2 px-3 py-2 rounded-md ${active ? "bg-gray-300" : "hover:bg-gray-200"}`}>
    {icon}
    {label}
  </Link>
);

const CollapsibleSection = ({ label, icon, isOpen, toggle, links }) => (
  <div>
    <button onClick={toggle} className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-200">
      <div className="flex items-center gap-2">{icon} {label}</div>
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
    {isOpen && (
      <div className="pl-6 pt-1 space-y-1">
        {links.map((link) => (
          <NavItem key={link.to} to={link.to} label={link.label} active={window.location.pathname === link.to} />
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
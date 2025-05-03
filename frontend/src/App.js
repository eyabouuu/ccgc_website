import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import DashboardLayout from "./LayoutDashboard.jsx/DashboardLayout";
import PowerBIEmbed from "./views/PowerBi";
import Users from "./views/Users";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <DashboardLayout>
                  <Users />
                </DashboardLayout>
              }
            />
            <Route path="/powerbi" element={<PowerBIEmbed />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

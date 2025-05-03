import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
        if (window.location.pathname === "/") {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
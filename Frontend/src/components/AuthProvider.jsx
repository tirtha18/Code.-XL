import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setUser(jwtDecode(storedToken));
    }
  }, []);

  const login = async (credentials) => {
    if (!credentials) {
      console.log("Invalid credentials");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials
      );
      console.log("Login successful:");
      const authToken = response.data.token;
      console.log(authToken);
      setToken(authToken);
      setUser(jwtDecode(authToken));
      localStorage.setItem("authToken", authToken);
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/sheets");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials!");
    }
  };
  const logout = () => {
    try {
      console.log(token);
      setToken(null);
      setUser(null);
      localStorage.removeItem("authToken");
      toast.success("You have been logged out succesfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

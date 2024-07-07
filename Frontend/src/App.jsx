import React from "react";
import Sheets from "./components/Sheets";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import LoginRegister from "./components/LoginRegister";
import { AuthProvider } from "./components/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MockAssessment from "./components/MockAssessment";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-row bg-black h-screen w-screen">
          <div className="w-1/6">
            <Navbar />
          </div>
          <div className="flex flex-col w-5/6 max-h-full h-screen">
            <Header />
            <Routes>
              <Route path="/login" element={<LoginRegister />} />
              <Route
                path="/sheets"
                element={
                  <ProtectedRoute>
                    <Sheets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mockassessment"
                element={
                  <ProtectedRoute>
                    <MockAssessment/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={2000} />
      </AuthProvider>
    </Router>
  );
}

export default App;

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
import LandHome from "./components/LandingPage/LandHome";
import CoreSub from "./components/CoreSub";
import Community from "./components/Community";
import { NavContextProvider } from "./components/NavContextProvider";
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavContextProvider>
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
                      <MockAssessment />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<LandHome />}></Route>
                <Route path="/coresub" element={<CoreSub />}></Route>
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
          <ToastContainer position="bottom-center" autoClose={2000} />
        </NavContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { useEffect } from "react";
import Sheets from "./components/pages/Sheets";
import Navbar from "./components/layout/Navbar";
import Header from "./components/layout/Header";
import LoginRegister from "./components/pages/LoginRegister";
import { AuthProvider } from "./components/context/AuthContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import MockAssessment from "./components/pages/MockAssessment";
import LandingPage from "./components/pages/LandingPage";
import CoreSub from "./components/pages/CoreSub";
import Community from "./components/pages/Community";
import { NavContextProvider } from "./components/context/NavContextProvider";
import { AvatarProvider } from "./components/context/AvatarContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <AvatarProvider>
          <NavContextProvider>
            <div className="flex flex-row bg-black h-screen w-screen font-sans">
              <div>
                <Navbar />
              </div>
              <div className="flex flex-col w-screen max-h-full overflow-hidden bg-black">
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
                  <Route path="/" element={<LandingPage />}></Route>
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
        </AvatarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

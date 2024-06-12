import React from "react";
import Sheets from "./components/Sheets";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import LoginRegister from "./components/LoginRegister";
import { AuthProvider } from "./components/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              <Route path="/sheets" element={<Sheets />} />
              <Route path="/login" element={<LoginRegister />} />
            </Routes>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={1000} />
      </AuthProvider>
    </Router>
  );
}

export default App;

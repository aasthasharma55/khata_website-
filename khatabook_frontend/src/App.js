import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import About from "./pages/About";
import SmartReminder  from "./pages/SmartReminder";
import CustomerEdit from "./pages/CustomerEdit";
import Home from "./pages/Home"
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ResetEmail from "./pages/ResetEmail";
import ResetPasswordPage from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="flex-grow-1">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <ProtectedRoute isPublic>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute isPublic>
                  <Register />
                </ProtectedRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/customers/:id/edit" element={<ProtectedRoute>
                  <CustomerEdit />
                </ProtectedRoute>} />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/smartreminder"
              element={
                <ProtectedRoute>
                  <SmartReminder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/:id"
              element={
                <ProtectedRoute>
                  <CustomerDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-email"
              element={
                <ProtectedRoute isPublic>
                  <ResetEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password/:uid/:token"
              element={
                <ProtectedRoute isPublic>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

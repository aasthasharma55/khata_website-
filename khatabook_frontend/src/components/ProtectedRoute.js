import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, isPublic = false }) {
  const token = localStorage.getItem("access");
  const location = useLocation();

  console.log("🔒 ProtectedRoute Check");
  console.log("  isPublic:", isPublic);
  console.log("  Token Exists:", !!token);
  console.log("  Current Path:", location.pathname);

  if (!isPublic && !token) {
    console.log("  ❌ No token → redirecting to /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isPublic && token) {
    console.log("  🔄 Token found on public page → redirecting to /");
    return <Navigate to="/" replace />;
  }

  console.log("  ✅ Access granted");
  return children;
}

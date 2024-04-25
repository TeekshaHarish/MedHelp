import React from "react";
import { Navigate } from "react-router-dom";
import { UserProvider } from "../UserContextProv";
export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <UserProvider> {children}</UserProvider>;
  } else {
    return <Navigate to="/login" />;
  }
}

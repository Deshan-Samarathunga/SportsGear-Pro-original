import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Brands from "./pages/Brands";
import Profile from "./pages/Profile";
import AdminProtectedRoute from "./components/AdminProtectedRoute"; // ✅

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <AdminProtectedRoute>
            <Users />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="products"
        element={
          <AdminProtectedRoute>
            <Products />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <AdminProtectedRoute>
            <Orders />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="brands"
        element={
          <AdminProtectedRoute>
            <Brands />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <AdminProtectedRoute>
            <Profile />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;

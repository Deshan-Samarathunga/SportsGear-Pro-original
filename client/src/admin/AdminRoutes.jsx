// client/src/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import ProductsList from "./pages/ProductsList";
import ProductsAdd from "./pages/ProductsAdd";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

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

      {/* ✅ Nested Product Routes */}
      <Route path="products">
        <Route
          index
          element={
            <AdminProtectedRoute>
              <ProductsList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="add"
          element={
            <AdminProtectedRoute>
              <ProductsAdd />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <AdminProtectedRoute>
              <ProductsAdd />
            </AdminProtectedRoute>
          }
        />
      </Route>

      <Route
        path="orders"
        element={
          <AdminProtectedRoute>
            <Orders />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from './components/Navbar'; 
import './components/Navbar.css';

import HomePage from "./components/HomePage";
import './components/HomePage.css';

import SignInPage from "./components/SignInPage";
import './components/SignInPage.css';

import SignUpPage from "./components/SignUpPage";
import './components/SignUpPage.css';

import Preloader from "./components/Preloader";
import './components/Preloader.css';

import ProductsPage from './components/ProductsPage';
import './components/ProductsPage.css';

import ContactUsPage from "./components/ContactUsPage";
import './components/ContactUsPage.css';

import ProfileSettingsPage from './components/ProfileSettingsPage';
import './components/ProfileSettingsPage.css';

import ChangePasswordPage from './components/ChangePasswordPage';
import AboutUsPage from './components/AboutUsPage';
import OrdersList from "./components/OrdersList";

import AdminRoutes from "./admin/AdminRoutes";

import SingleProduct from "./components/SingleProduct";

// 👇 Create a wrapper for hiding navbar
//location.pathname.startsWith("/admin")
//If true → hides the navbar in admin dashboard

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Preloader />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfileSettingsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

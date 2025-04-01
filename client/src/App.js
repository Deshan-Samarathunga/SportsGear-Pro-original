import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'; // Navbar
import './components/Navbar.css';

import HomePage from "./components/HomePage"; // Home Page
import './components/HomePage.css';

import SignInPage from "./components/SignInPage"; // SignIn Page
import './components/SignInPage.css';

import SignUpPage from "./components/SignUpPage"; // Sign Up Page
import './components/SignUpPage.css';

import Preloader from "./components/Preloader"; //  Preloader
import './components/Preloader.css'; 

import ProductsPage from './components/ProductsPage'; //Products Page
import './components/ProductsPage.css';


import ContactUsPage from "./components/ContactUsPage"; //Contact Us Page
import './components/ContactUsPage.css';

import ProfileSettingsPage from './components/ProfileSettingsPage'; //Profile Settings Page
import './components/ProfileSettingsPage.css';

import ChangePasswordPage from './components/ChangePasswordPage'; //Change Password Page

import AboutUsPage from './components/AboutUsPage'; // about us page

import OrdersList from "./components/OrdersList";



function App() {
    return (
        <Router>
            <Preloader /> {/* Show preloader at top */}
            <Navbar />
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
            </Routes>
        </Router>
    );
}

export default App;

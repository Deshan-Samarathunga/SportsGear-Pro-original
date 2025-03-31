import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'; // Navbar
import './components/Navbar.css';

import HomePage from "./components/HomePage"; // HomePage
import './components/HomePage.css';

import SignInPage from "./components/SignInPage"; // SignInPage
import './components/SignInPage.css';

import SignUpPage from "./components/SignUpPage"; // SignInPage
import './components/SignUpPage.css';

import Preloader from "./components/Preloader"; //  Preloader
import './components/Preloader.css'; 

import ProductsPage from './components/ProductsPage'; //ProductsPage
import './components/ProductsPage.css';


import ContactUsPage from "./components/ContactUsPage"; //ContactUsPage
import './components/ContactUsPage.css';

import ProfileSettingsPage from './components/ProfileSettingsPage'; //ProfileSettingsPage
import './components/ProfileSettingsPage.css';



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
                <Route path="/contact" element={<ContactUsPage />} />

            </Routes>
        </Router>
    );
}

export default App;

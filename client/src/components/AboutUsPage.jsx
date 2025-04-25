import React from "react";
import "./style/AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <div className="about-container">
        <h1>About Us</h1>
        <p className="subtitle">Your trusted source for premium sports gear</p>

        <div className="about-cards">

          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              At SportsGear Pro, our mission is to empower athletes and sports lovers by providing
              high-quality gear, exceptional service, and a platform to connect and grow.
            </p>
          </div>

          <div className="about-card">
            <h2>Who We Are</h2>
            <p>
              We're a team of athletes, techies, and sports enthusiasts who believe everyone deserves
              access to reliable and top-notch equipment. Whether you're a beginner or a pro,
              we're here to support your journey.
            </p>
          </div>

          <div className="about-card">
            <h2>Why Choose Us?</h2>
            <ul className="reasons-list">
              <li>✔️ Wide selection of trusted sports brands</li>
              <li>✔️ Fast and reliable delivery</li>
              <li>✔️ Responsive customer support</li>
              <li>✔️ Exclusive member benefits and loyalty rewards</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

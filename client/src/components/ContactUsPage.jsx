import React from "react";
import "./style/ContactUsPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';



const ContactPage = () => {
  return (
    <section className="contact-page">
      <div className="banner-page">
        <h2>Contact Us</h2>
      </div>

      <div className="container contact-container">
        <div className="contact-form">
          <h2>Get in Touch with Us</h2>
          <form>
            <label htmlFor="f_name">
              Full Name<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              id="f_name"
              required
            />

            <label htmlFor="e_mail">
              E-Mail<span>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Your E-mail"
              id="e_mail"
              required
            />

            <label htmlFor="p_number">
              Phone Number<span>*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
              id="p_number"
              required
            />

            <label htmlFor="message">
              Message<span>*</span>
            </label>
            <textarea
              id="message"
              rows="6"
              placeholder="Write your message here..."
              required
            ></textarea>

            <button type="submit" className="btn main-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Contact Info</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "10px" }} />
              <span>Location: Asgiriya, Gampaha</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px" }} />
              <span>Contact Number: 964-622-3903</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px" }} />
              <span>Email: sportsgearpro@contact.com</span>
            </li>
          </ul>

          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31675.067775326752!2d79.99171355202536!3d7.081464785426585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fb67a22e72d9%3A0x913a2c56a49c8d8e!2sGampaha!5e0!3m2!1sen!2slk!4v1743402488697!5m2!1sen!2slk"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

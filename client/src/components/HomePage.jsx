import React from "react";
import { Link } from "react-router-dom";
import bgvideo from "../assets/video/bgvideo.mp4";
import ChatBot from "../components/ChatBot";
import "./style/HomePage.css";

const HomePage = () => {
  return (
    <section className="box" id="home">
      <video
        src={bgvideo}
        autoPlay
        muted
        loop
        className="box video"
      ></video>
      <div className="caption">
        <h1>Where champions find their gear</h1>
        <p className="lead my-4">
          Elevate your game with top-quality sportswear & equipment.
        </p>
        <Link to="/signup" className="btn btn-primary btn-lg">
          Join Us
        </Link>
      </div>
      <ChatBot />
    </section>
  );
};

export default HomePage;

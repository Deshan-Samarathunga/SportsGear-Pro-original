import React, { useEffect } from "react";
import "./Preloader.css"; 

const Preloader = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("fade-out");
      }
      document.body.style.overflow = "visible";
    }, 1500); // Adjust delay 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader">
      <div className="inner">
        <div className="ball">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

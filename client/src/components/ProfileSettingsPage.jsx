import React, { useState, useEffect } from "react";
import "./style/ProfileSettingsPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useAuth } from "../context/AuthContext";

const ProfileSettingsPage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    image: null,
    imageUrl: "", // this holds the saved image path
  });

  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        address: user.address || "",
        city: user.city || "",
        imageUrl: user.image || "", // preload image
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProfile((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      let uploadedImageUrl = profile.imageUrl;

      // upload image first if selected
      if (profile.image) {
        const formData = new FormData();
        formData.append("image", profile.image);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/auth/upload-profile-pic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        uploadedImageUrl = uploadRes.data.url;
      }

      // update user profile
      await axios.put(
        "http://localhost:5000/api/auth/update",
        {
          name: profile.name,
          phone: profile.phone,
          dob: profile.dob,
          address: profile.address,
          city: profile.city,
          image: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update context and localStorage
      updateUser({ 
        name: profile.name,
        phone: profile.phone,
        dob: profile.dob,
        address: profile.address,
        city: profile.city,
        image: uploadedImageUrl,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-settings-page">
      <SidebarMenu user={user} />
      <div className="main-content">
        <form className="profile-form" onSubmit={handleSubmit}>
          <h3>Update Profile Picture</h3>
          <div className="image-upload">
            <img
              src={
                profile.imageUrl
                  ? `http://localhost:5000${profile.imageUrl}?t=${Date.now()}`
                  : "/profile.png"
              }
              alt="profile"
              className="preview-img"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <h3>Main Information</h3>

          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />

          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            disabled
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={profile.phone}
            onChange={handleChange}
          />

          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
          />

          <label>Address:</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            rows="2"
          ></textarea>

          <label>City:</label>
          <input
            type="text"
            name="city"
            placeholder="Enter Your City"
            value={profile.city}
            onChange={handleChange}
          />

          <button type="submit" className="btn main-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;

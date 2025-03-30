import React, { useEffect, useState } from "react";
import "./ProductsPage.css";
import sampleData from "../data/products.json";

const ProductPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setVehicles(sampleData);
    setFilteredVehicles(sampleData);
  }, []);

  useEffect(() => {
    let filtered = vehicles.filter((vehicle) => {
      return (
        vehicle.vehicle_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || vehicle.vehicle_brand === selectedCategory)
      );
    });
    setFilteredVehicles(filtered);
  }, [searchTerm, selectedCategory, vehicles]);

  const categories = ["All", ...new Set(sampleData.map((item) => item.vehicle_brand))];

  return (
    <section className="product-page">
      <div className="controls">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="container">
        <div className="grid-3">
          {filteredVehicles.map((vehicle) => (
            <div className="card" key={vehicle.vehicle_id}>
              <div className="card-img">
                <div className="card-tag">
                  <span>{vehicle.vehicle_brand}</span>
                </div>
                <img src={vehicle.vImg1} alt={vehicle.vehicle_title} />
              </div>
              <div className="card-body">
                <div className="row">
                  <h4>{vehicle.vehicle_title}</h4>
                  <h5>{vehicle.year}</h5>
                </div>
                <div className="row">
                  <p><i className="ri-group-line"></i> {vehicle.capacity}</p>
                  <p><i className="ri-gas-station-line"></i> {vehicle.fuel_type}</p>
                </div>
                <div className="row">
                  <p><i className="ri-car-line"></i> {vehicle.year}</p>
                  <p><i className="ri-steering-2-fill"></i> {vehicle.transmission}</p>
                </div>
                <hr />
                <div className="row between">
                  <h3>Rs.{vehicle.price} <span>/ Day</span></h3>
                </div>
                <div className="row buttons">
                  <button className="buy-btn">Buy Now</button>
                  <button className="cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

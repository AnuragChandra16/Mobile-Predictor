import React, { useState } from "react";
import "./App.css";

function App() {
  const [price, setPrice] = useState("");
  const [mobileDetails, setMobileDetails] = useState(null);
  const [error, setError] = useState(""); // State for error message

  const handleSearch = async () => {
    if (price <= 0 || isNaN(price)) {
      setError("Please enter a valid positive price!");
      setMobileDetails(null); // Clear previous results
      return;
    }
    if (price < 1000 || isNaN(price)) {
      setError("Please enter a price more than or equal to 1000");
      setMobileDetails(null); // Clear previous results
      return;
    }

    setError(""); // Clear any previous errors

    const response = await fetch("https://mobile-1m3f.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    });

    const data = await response.json();
    setMobileDetails(data.best_mobile);
  };

  return (
    <>
      <div className="heading-container">
        <h1>Find the Best Mobile!!!</h1>
        <h2>The most nearest to your price mobile will be displayed below. The best one is selected on the basis of current ratings and reviews.</h2>
      </div>

      <div className="container">
        <div className="search-box">
          <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="1"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Show error message if price is invalid */}
        {error && <div className="error-box">{error}</div>}

        {/* Show mobile details if available */}
        {mobileDetails && !error && (
          <div className="response-box">
            <p><strong>Name:</strong> {mobileDetails.name}</p>
            <p><strong>Price:</strong> Rs.{mobileDetails.price}</p>
            <p><strong>Reviews:</strong> {mobileDetails.reviews}</p>
            <p><strong>Description:</strong> {mobileDetails.description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

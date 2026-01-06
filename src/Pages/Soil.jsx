import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSoils, getCropsBySoil } from "../services/api";
import "../styles/Soil.css";

export default function Soil() {
  const [soils, setSoils] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedSoil, setSelectedSoil] = useState("");

  // ✅ Load soils for logged-in user (JWT based)
  useEffect(() => {
    getSoils()
      .then(res => setSoils(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSoilClick = (soilType) => {
    setSelectedSoil(soilType);

    getCropsBySoil(soilType)
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-content">
        <h2>Soil Services</h2>

        {/* 🌱 Soil Cards */}
        <div className="soil-grid">
          {soils.length === 0 && <p>No soil data available</p>}

          {soils.map((s, i) => (
            <div
              key={i}
              className={`soil-card ${
                selectedSoil === s.soilType ? "active" : ""
              }`}
              onClick={() => handleSoilClick(s.soilType)}
            >
              {s.soilType}
            </div>
          ))}
        </div>

        {/* 🌾 Crop Results */}
        {selectedSoil && (
          <>
            <h3>Compatible Crops for {selectedSoil} Soil</h3>

            <div className="crop-grid">
              {crops.length === 0 ? (
                <p>No crops found for this soil</p>
              ) : (
                crops.map((c, i) => (
                  <div key={i} className="crop-card">
                    <h4>{c.name}</h4>
                    <p><b>Season:</b> {c.suitableSeason}</p>
                    <p>
                      <b>Temp:</b> {c.minTemperature}°C – {c.maxTemperature}°C
                    </p>
                    <p><b>Cost:</b> ₹{c.estimatedCost}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

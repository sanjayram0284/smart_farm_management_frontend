import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSoils, getRecommendations } from "../services/api";

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import chatbotConfig from "../Chatbot/config";
import MessageParser from "../Chatbot/MessageParser";
import ActionProvider from "../Chatbot/ActionProvider";

import "../styles/Recommendation.css";

export default function Recommendation() {
  const [soils, setSoils] = useState([]);
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load soil types for logged-in user (JWT based)
  useEffect(() => {
    getSoils()
      .then(res => setSoils(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = async () => {
    if (!soil || !season) {
      alert("Select soil and season");
      return;
    }

    try {
      setLoading(true);
      const res = await getRecommendations(soil, season);
      setCrops(res.data);
    } catch (err) {
      alert("No recommendations found");
      setCrops([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-content recommendation-layout">
        {/* ================= LEFT SIDE ================= */}
        <div className="recommendation-main rec-main">
          <h2>Crop Recommendation</h2>

          {/* FILTERS */}
          <div className="filter-box rec-filter-box">
            <select value={soil} onChange={e => setSoil(e.target.value)}>
              <option value="">Select Soil</option>
              {soils.map((s, i) => (
                <option key={i} value={s.soilType}>
                  {s.soilType}
                </option>
              ))}
            </select>

            <select value={season} onChange={e => setSeason(e.target.value)}>
              <option value="">Select Season</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Rainy">Rainy</option>
              <option value="Autumn">Autumn</option>
            </select>

            <button onClick={handleSearch}>
              Get Recommendation
            </button>
          </div>

          {/* LOADING */}
          {loading && <p className="rec-loading">Loading...</p>}

          {/* RESULT LIST */}
          <div className="recommendation-list rec-list">
            {!loading && crops.length === 0 && (
              <p className="rec-empty">No crops to display</p>
            )}

            {crops.map(crop => (
              <div key={crop.id} className="crop-card rec-card">
                <h3>{crop.name}</h3>
                <p><b>Soil:</b> {crop.soilType}</p>
                <p><b>Season:</b> {crop.suitableSeason}</p>
                <p><b>Cost:</b> ₹{crop.estimatedCost}</p>
                <p>
                  <b>Temp:</b> {crop.minTemperature}°C – {crop.maxTemperature}°C
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE (CHATBOT) ================= */}
        <div className="chatbot-container rec-chatbot">
          <Chatbot
            config={chatbotConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCrops } from "../services/api";
import "../styles/Dashboard.css";

// calculate months since planted
function monthsSincePlanted(date) {
  if (!date) return "-";
  const planted = new Date(date);
  const now = new Date();
  return (
    (now.getFullYear() - planted.getFullYear()) * 12 +
    (now.getMonth() - planted.getMonth())
  );
}

export default function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCrops()
      .then((res) => setCrops(res.data))
      .catch((err) => console.error(err));
  }, []);

  /* ===== DASHBOARD METRICS ===== */

  const totalCrops = crops.length;

  const totalExpense = crops.reduce(
    (sum, crop) => sum + (crop.estimatedCost || 0),
    0
  );

  const highestExpenseCrop =
    crops.length > 0
      ? crops.reduce((max, crop) =>
          crop.estimatedCost > max.estimatedCost ? crop : max
        )
      : null;

  const soilCount = {};
  crops.forEach((crop) => {
    soilCount[crop.soilType] =
      (soilCount[crop.soilType] || 0) + 1;
  });

  const mostUsedSoil =
    Object.keys(soilCount).length > 0
      ? Object.keys(soilCount).reduce((a, b) =>
          soilCount[a] > soilCount[b] ? a : b
        )
      : "-";

  const filteredCrops = crops.filter(
    (crop) =>
      crop.name?.toLowerCase().includes(search.toLowerCase()) ||
      crop.soilType?.toLowerCase().includes(search.toLowerCase()) ||
      crop.suitableSeason?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar />

      <div className="dashboard">
        {/* ===== STAT CARDS ===== */}
        <div className="stats-grid">
          <div className="stat-card green">
            <div className="stat-icon">🌱</div>
            <div>
              <p>Total Crops</p>
              <h3>{totalCrops}</h3>
            </div>
          </div>

          <div className="stat-card blue">
            <div className="stat-icon">₹</div>
            <div>
              <p>Total Expense</p>
              <h3>₹ {totalExpense}</h3>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">🔥</div>
            <div>
              <p>Highest Expense</p>
              <h3>
                {highestExpenseCrop
                  ? `${highestExpenseCrop.name} – ₹${highestExpenseCrop.estimatedCost}`
                  : "-"}
              </h3>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">🪨</div>
            <div>
              <p>Most Used Soil</p>
              <h3>
                {mostUsedSoil !== "-"
                  ? `${mostUsedSoil} (${soilCount[mostUsedSoil]})`
                  : "-"}
              </h3>
            </div>
          </div>
        </div>

        {/* ===== TABLE SECTION ===== */}
        <div className="dashboard-top">
          <h2>🌾 Crop Dashboard</h2>
          <input
            type="text"
            placeholder="Search crop / soil / season..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <span>Crop</span>
            <span>Expense ₹</span>
            <span>Soil</span>
            <span>Season</span>
            <span>Months</span>
            <span>Moisture %</span>
            <span>Min °C</span>
            <span>Max °C</span>
          </div>

          {filteredCrops.length === 0 ? (
            <div className="no-data">No crops found 🌱</div>
          ) : (
            filteredCrops.map((crop) => (
              <div className="table-row" key={crop.id}>
                <span>{crop.name}</span>
                <span>₹ {crop.estimatedCost}</span>
                <span>{crop.soilType}</span>
                <span>{crop.suitableSeason}</span>
                <span>{monthsSincePlanted(crop.plantedDate)}</span>
                <span>{crop.moisture}</span>
                <span>{crop.minTemperature}</span>
                <span>{crop.maxTemperature}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

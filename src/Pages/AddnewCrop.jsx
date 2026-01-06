import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addNewCrop } from "../services/api";
import "../styles/AddNewCrop.css";

export default function AddNewCrop() {

  const [form, setForm] = useState({
    name: "",
    suitableSeason: "",
    soilType: "",
    minMoisture: "",
    maxMoisture: "",
    moisture: "",
    minTemperature: "",
    maxTemperature: "",
    estimatedCost: "",
    plantedDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ JWT identifies the user — NO userEmail needed
    const payload = {
      name: form.name,
      suitableSeason: form.suitableSeason,
      soilType: form.soilType,
      minMoisture: Number(form.minMoisture),
      maxMoisture: Number(form.maxMoisture),
      moisture: Number(form.moisture),
      minTemperature: Number(form.minTemperature),
      maxTemperature: Number(form.maxTemperature),
      estimatedCost: Number(form.estimatedCost),
      plantedDate: form.plantedDate
    };

    try {
      await addNewCrop(payload);
      alert("Crop added successfully");

      setForm({
        name: "",
        suitableSeason: "",
        soilType: "",
        minMoisture: "",
        maxMoisture: "",
        moisture: "",
        minTemperature: "",
        maxTemperature: "",
        estimatedCost: "",
        plantedDate: ""
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add crop");
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-content">
        <h2>Add New Crop</h2>

        <form className="crop-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Crop Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="suitableSeason"
            placeholder="Season"
            value={form.suitableSeason}
            onChange={handleChange}
            required
          />

          <input
            name="soilType"
            placeholder="Soil Type"
            value={form.soilType}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="minMoisture"
            placeholder="Min Moisture"
            value={form.minMoisture}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="maxMoisture"
            placeholder="Max Moisture"
            value={form.maxMoisture}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="moisture"
            placeholder="Current Moisture"
            value={form.moisture}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="minTemperature"
            placeholder="Min Temperature"
            value={form.minTemperature}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="maxTemperature"
            placeholder="Max Temperature"
            value={form.maxTemperature}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="estimatedCost"
            placeholder="Estimated Cost"
            value={form.estimatedCost}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="plantedDate"
            value={form.plantedDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Crop</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

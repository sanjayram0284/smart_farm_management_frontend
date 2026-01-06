import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getCrops,
  updateExpense,
  getExpenseHistory
} from "../services/api";
import "../styles/Expenses.css";

export default function Expenses() {
  const [crops, setCrops] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [history, setHistory] = useState([]);
  const [activeCrop, setActiveCrop] = useState(null);

  const loadCrops = () => {
    // ✅ JWT identifies user
    getCrops()
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const handleAmountChange = (cropName, value) => {
    setAmounts(prev => ({
      ...prev,
      [cropName]: value
    }));
  };

  const handleUpdate = async (cropName) => {
    const amount = amounts[cropName];

    if (!amount) {
      alert("Enter amount");
      return;
    }

    try {
      await updateExpense({
        cropName,
        amount: Number(amount)
      });

      alert("Expense updated");
      setAmounts(prev => ({ ...prev, [cropName]: "" }));
      loadCrops(); // 🔥 refresh updated value
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleHistory = async (cropName) => {
    try {
      const res = await getExpenseHistory(cropName);
      setActiveCrop(cropName);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-content">
        <h2>Expenses</h2>

        {crops.length === 0 && (
          <p>No crops found for this user</p>
        )}

        {crops.map(crop => (
          <div key={crop.id} className="expense-row">
            <span>{crop.name}</span>
            <span>₹ {crop.estimatedCost}</span>

            <input
              type="number"
              placeholder="New Amount"
              value={amounts[crop.name] || ""}
              onChange={e =>
                handleAmountChange(crop.name, e.target.value)
              }
            />

            <button onClick={() => handleUpdate(crop.name)}>
              Update
            </button>

            <button onClick={() => handleHistory(crop.name)}>
              History
            </button>
          </div>
        ))}

        {history.length > 0 && (
          <div className="history-box">
            <h3>Expense History — {activeCrop}</h3>
            {history.map((h, i) => (
              <p key={i}>
                ₹{h.amount} — {h.updatedDate}
              </p>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

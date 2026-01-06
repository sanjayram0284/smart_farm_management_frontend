import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Recommendation from "./Pages/Recommendation";
import Expenses from "./Pages/Expenses";
import Soil from "./Pages/Soil";
import ProtectedRoute from "./components/ProtectedRoute";
import AddnewCrop from "./Pages/AddnewCrop";
import Profile from "./components/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addnewcrop" element={<AddnewCrop />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/recommendation" element={<ProtectedRoute><Recommendation /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/soil" element={<ProtectedRoute><Soil /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

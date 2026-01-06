import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import API from "../services/api";
import "../styles/Profile.css";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await API.post("/users/upload-profile", formData);

      // 🔑 IMPORTANT: keep old token
      const updatedUser = {
        ...user,
        profileImage: res.data.profileImage
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Profile updated");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Not logged in</p>;

  return (
    <div className="profile-layout">
      <Navbar />

      <div className="profile-wrapper">
        <div className="profile-box">
          <h2>My Profile</h2>

          <img
            src={user.profileImage || "https://via.placeholder.com/160"}
            className="profile-image-large"
          />

          <p data-label="Name"> {user.name}</p>
           <p data-label="Email"> {user.email}</p>
          <p data-label="Phone"> {user.phone || "Not provided"}</p>



          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleUpload} disabled={loading}>
            Upload
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

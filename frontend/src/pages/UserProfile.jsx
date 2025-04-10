import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePic: "",
  });

  const [form, setForm] = useState({
    username: "",
    profilePicFile: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/profile", {
          withCredentials: true,
        });

        if (response.data.success) {
          const { username, email, profilePic } = response.data.user;
          setUser({ username, email, profilePic });
          setForm({ username, profilePicFile: null });
          setPreviewImage(profilePic);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, username: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profilePicFile: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (editMode) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      if (form.profilePicFile) {
        formData.append("profilePic", form.profilePicFile);
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/users/update",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setEditMode(false);
        setPreviewImage(response.data.user.profilePic);
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating profile");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/users/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
      <div className=" bg-gradient-to-br from-sky-400 to-blue-100 p-8 rounded-3xl shadow-xl h-90 w-full max-w-md text-center">
        <div className="relative inline-block cursor-pointer group" onClick={handleImageClick}>
          <img
            src={
              previewImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdztTDcpZ2pFqwWDYwSXbvZq5nzJYg5cn8w&s"
            }
            alt="Profile"
            className="w-30 h-30 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
          />
          {editMode && (
            <div className="w-30 h-30 absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm">Change Photo</span>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {editMode ? (
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md "
              placeholder="Username"
            />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mt-2">{user.username}</h2>
            <p className="text-gray-600 mt-2 ">{user.email}</p>
          </>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

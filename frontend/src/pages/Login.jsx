import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [backendMessage, setBackendMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData,
        { 
          withCredentials: true //important for cookie to be saved
        }
      );

      const data = response.data;
      console.log(data);

      if (data.success) {
        alert(data.message);

        // Optionally store user info locally (not token, token is cookie now)
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === "owner") {
          navigate("/owner/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setBackendMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        {backendMessage && (
          <h1 className="text-red-500 text-center font-medium text-[15px] p-1.5">
            {backendMessage}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Login;

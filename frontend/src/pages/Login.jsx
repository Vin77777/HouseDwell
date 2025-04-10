import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password: "",
  });
  
  const [backendMessage,setbackendMessage] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    console.log(formData);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData,{
          withCredentials:true,
        }
      );
  
      const data = response.data; // axios parses the JSON for you
      console.log(data);
  
      if (data.success) {
        console.log(data.message);
        alert(data.message);
        navigate("/");
      } else {
        console.error("Login failed");
        setbackendMessage(data.message);
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-150 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login to Continue</h2>
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
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/Signup" className="text-blue-500">Sign-up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
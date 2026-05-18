import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Handle input changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle login
    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            // Store JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login successful");

            // Redirect
            navigate("/upload");

        } catch (error) {

            console.log(error.response.data);

            alert(error.response.data.error);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                {/* Email Input */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6"
                />

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

            </div>
        </div>
    );
}

export default Login;
import { useState } from "react";
import axios from "axios";

function SignUp() {

    // Store form data
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    // Handle signup
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/signup",
                form
            );

            console.log(response.data);

            alert(response.data.message);

        } catch (error) {

            console.error("Error signing up:", error);

            alert("Signup failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Signup
                </h1>

                {/* Name Input */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Email Input */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6"
                />

                {/* Signup Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Create Account
                </button>

            </div>
        </div>
    );
}

export default SignUp;
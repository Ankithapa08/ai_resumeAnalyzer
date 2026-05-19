import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate();

    // Store form data
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

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

        if (
            !form.name ||
            !form.email ||
            !form.password
        ) {

            alert("Fill all fields");

            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(

                "https://ai-resumeanalyzer-epjv.onrender.com/api/auth/signup",

                form
            );

            alert(response.data.message);

            // Redirect to login
            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.error ||
                "Signup failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="
            min-h-screen
            bg-gray-100
            flex
            items-center
            justify-center
            px-4
        ">

            <div className="
                bg-white
                p-6 sm:p-8
                rounded-2xl
                shadow-lg
                w-full
                max-w-md
            ">

                {/* Heading */}
                <h1 className="
                    text-2xl sm:text-3xl
                    font-bold
                    mb-6
                    text-center
                ">
                    Signup
                </h1>

                {/* Name Input */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                        text-sm sm:text-base
                        outline-none
                        focus:ring-2
                        focus:ring-blue-400
                    "
                />

                {/* Email Input */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                        text-sm sm:text-base
                        outline-none
                        focus:ring-2
                        focus:ring-blue-400
                    "
                />

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-6
                        text-sm sm:text-base
                        outline-none
                        focus:ring-2
                        focus:ring-blue-400
                    "
                />

                {/* Signup Button */}
                <button
                    onClick={handleSubmit}
                    className="
                        w-full
                        bg-blue-600
                        text-white
                        py-3
                        rounded-lg
                        hover:bg-blue-700
                        transition
                    "
                >
                    {
                        loading
                            ? "Creating Account..."
                            : "Create Account"
                    }
                </button>

            </div>

        </div>
    );
}

export default SignUp;
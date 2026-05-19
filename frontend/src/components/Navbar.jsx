import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    // Check token
    const token = localStorage.getItem("token");

    // Logout function
    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

        window.location.reload();
    };

    return (

        <nav className="bg-white shadow-md px-4 py-4">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-purple-600 text-center md:text-left">
                    AI Resume Analyzer
                </h1>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">

                    {
                        token ? (
                            <>
                                {/* Private Routes */}
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-purple-600"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/upload"
                                    className="text-gray-700 hover:text-purple-600"
                                >
                                    Upload Resume
                                </Link>

                                <Link
                                    to="/mock-interview"
                                    className="text-gray-700 hover:text-purple-600"
                                >
                                    Mock Interview
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Public Routes */}
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-purple-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                                >
                                    Signup
                                </Link>
                            </>
                        )
                    }

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
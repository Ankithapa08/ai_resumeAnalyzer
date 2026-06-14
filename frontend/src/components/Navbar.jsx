import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="bg-white shadow-md">
            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    py-4
                    flex
                    items-center
                    justify-between
                "
            >
                {/* Logo */}
                <Link
                    to={token ? "/dashboard" : "/"}
                    className="
                        text-2xl
                        font-bold
                        text-purple-600
                    "
                >
                    AI Resume Analyzer
                </Link>

                {/* Desktop Menu */}
                <div
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-6
                    "
                >
                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="hover:text-purple-600 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/upload"
                                className="hover:text-purple-600 transition"
                            >
                                Upload Resume
                            </Link>

                            <Link
                                to="/chat-resume"
                                className="hover:text-purple-600 transition"
                            >
                                Chat Resume
                            </Link>

                            <Link
                                to="/mock-interview"
                                className="hover:text-purple-600 transition"
                            >
                                Mock Interview
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="
                                    bg-red-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-red-600
                                    transition
                                "
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-purple-600 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="
                                    bg-purple-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-purple-700
                                    transition
                                "
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                >
                    {menuOpen ? (
                        <X size={30} />
                    ) : (
                        <Menu size={30} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className="
                        md:hidden
                        flex
                        flex-col
                        gap-4
                        px-4
                        pb-4
                        bg-white
                    "
                >
                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="hover:text-purple-600"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/upload"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="hover:text-purple-600"
                            >
                                Upload Resume
                            </Link>

                            <Link
                                to="/chat-resume"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="hover:text-purple-600"
                            >
                                Chat Resume
                            </Link>

                            <Link
                                to="/mock-interview"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="hover:text-purple-600"
                            >
                                Mock Interview
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="
                                    bg-red-500
                                    text-white
                                    py-2
                                    rounded-lg
                                "
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="
                                    bg-purple-600
                                    text-white
                                    py-2
                                    rounded-lg
                                    text-center
                                "
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function UploadResume() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");

    // File selection
    const handleFileChange = (e) => {

        setFile(e.target.files[0]);
    };

    // Upload function
    const handleUpload = async () => {

        if (!file) {

            alert("Select resume first");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("resume", file);

            const response = await axios.post(
                "https://ai-resumeanalyzer-epjv.onrender.com/api/upload/resume",
                formData,
                {
                    headers: {
                        Authorization:
                            localStorage.getItem("token")
                    }
                }
            );

            // Store analysis
            setAnalysis(response.data.aiFeedback);

            // Success message
            alert(response.data.message);

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Upload failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex justify-center mt-10 px-4">

                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">

                    {/* Heading */}
                    <h1 className="text-3xl font-bold mb-5 text-center">
                        Upload Resume
                    </h1>

                    {/* File Input */}
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded-lg mb-4"
                    />

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Upload Resume
                    </button>

                    {/* AI Analysis Section */}
                    {
                        analysis && (

                            <div className="mt-6 space-y-4">

                                {/* Title Card */}
                                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-xl shadow">

                                    <h2 className="text-2xl font-bold text-center">
                                        Resume Analysis
                                    </h2>

                                    <p className="text-center text-sm text-purple-100 mt-1">
                                        AI-powered feedback
                                    </p>

                                </div>

                                {/* Analysis Content */}
                                <div className="bg-gray-50 p-4 rounded-xl shadow border">

                                    <div className="whitespace-pre-wrap leading-7 text-gray-800">

                                        {analysis}

                                    </div>

                                </div>

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default UploadResume;
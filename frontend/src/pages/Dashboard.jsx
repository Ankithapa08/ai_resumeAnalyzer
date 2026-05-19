import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Dashboard() {

    const [analyses, setAnalyses] = useState([]);

    // Fetch analysis data
    useEffect(() => {

        fetchAnalysis();

    }, []);

    const fetchAnalysis = async () => {

        try {

            const response = await axios.get(

                "https://ai-resumeanalyzer-epjv.onrender.com/api/dashboard/my-analysis",

                {
                    headers: {
                        Authorization:
                            localStorage.getItem("token")
                    }
                }
            );

            setAnalyses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // Latest uploaded resume
    const latestAnalysis = analyses[0];

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-4 sm:p-6 md:p-8">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                    {/* Upload Count */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            Upload Count
                        </h2>

                        <p className="text-3xl sm:text-4xl font-bold text-purple-600">
                            {analyses.length}
                        </p>

                    </div>

                    {/* Latest Resume */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            Latest Resume
                        </h2>

                        <p className="text-base sm:text-lg font-bold text-green-600">

                            {
                                latestAnalysis
                                    ? "Uploaded"
                                    : "No Resume"
                            }

                        </p>

                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            Recent Activity
                        </h2>

                        <p className="text-gray-700 text-sm sm:text-base">

                            {
                                latestAnalysis
                                    ? "Resume analyzed successfully"
                                    : "No activity yet"
                            }

                        </p>

                    </div>

                </div>

                {/* Latest Resume Analysis */}
                {
                    latestAnalysis && (

                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">

                            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                                Latest Resume Analysis
                            </h2>

                            <div className="
                                whitespace-pre-wrap
                                break-words
                                overflow-auto
                                leading-7
                                text-gray-800
                                text-sm
                                sm:text-base
                            ">

                                {latestAnalysis.aiFeedback}

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Dashboard;
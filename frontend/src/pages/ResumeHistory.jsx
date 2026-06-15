import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function ResumeHistory() {

    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

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

        } finally {

            setLoading(false);
        }
    };

    const deleteAnalysis = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this analysis?"
            );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `https://ai-resumeanalyzer-epjv.onrender.com/api/dashboard/delete/${id}`,
                {
                    headers: {
                        Authorization:
                            localStorage.getItem("token")
                    }
                }
            );

            setAnalyses(
                analyses.filter(
                    item => item._id !== id
                )
            );

        } catch (error) {

            console.log(error);

            alert("Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-6">

                <h1 className="text-4xl font-bold mb-8">
                    Resume History
                </h1>

                {loading ? (

                    <p>Loading...</p>

                ) : analyses.length === 0 ? (

                    <div className="bg-white p-8 rounded-xl shadow">
                        No analyses found.
                    </div>

                ) : (

                    <div className="grid gap-6">

                        {analyses.map(
                            (analysis) => (

                                <div
                                    key={analysis._id}
                                    className="
                                        bg-white
                                        p-6
                                        rounded-xl
                                        shadow
                                    "
                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h2 className="text-xl font-bold">
                                                {
                                                    analysis.resumeName ||
                                                    "Resume"
                                                }
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {
                                                    new Date(
                                                        analysis.createdAt
                                                    ).toLocaleString()
                                                }
                                            </p>

                                        </div>

                                        <button
                                            onClick={() =>
                                                deleteAnalysis(
                                                    analysis._id
                                                )
                                            }
                                            className="
                                                bg-red-500
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                hover:bg-red-600
                                            "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mt-5">

                                        <div className="bg-purple-100 p-4 rounded-lg">
                                            <p className="text-gray-600">
                                                ATS Score
                                            </p>

                                            <p className="text-3xl font-bold text-purple-700">
                                                {
                                                    analysis.aiFeedback?.atsScore || 0
                                                }%
                                            </p>
                                        </div>

                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-gray-600">
                                                Job Match Score
                                            </p>

                                            <p className="text-3xl font-bold text-green-700">
                                                {
                                                    analysis.aiFeedback?.jobMatchScore || 0
                                                }%
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mt-5">

                                        <h3 className="font-bold mb-2">
                                            Summary
                                        </h3>

                                        <p className="text-gray-700">
                                            {
                                                analysis.aiFeedback?.summary ||
                                                "No summary available"
                                            }
                                        </p>

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

export default ResumeHistory;

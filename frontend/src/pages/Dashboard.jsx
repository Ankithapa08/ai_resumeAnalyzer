import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Dashboard() {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);

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
                            localStorage.getItem("token"),
                    },
                }
            );

            setAnalyses(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const latestAnalysis = analyses[0];

    const parseAiFeedback = (aiFeedback) => {
        if (typeof aiFeedback === "object" && aiFeedback !== null) {
            return aiFeedback;
        }
        if (typeof aiFeedback === "string") {
            try {
                const match = aiFeedback.match(/\{[\s\S]*\}/);
                return JSON.parse(match ? match[0] : aiFeedback);
            } catch (error) {
                console.log(
                    "Unable to parse aiFeedback string:",
                    error
                );
                return null;
            }
        }
        return null;
    };

    const rawFeedback = latestAnalysis?.aiFeedback;
    const feedback = parseAiFeedback(rawFeedback);
    const isLegacyAnalysis =
        typeof rawFeedback === "string" && !feedback;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <div className="flex justify-center items-center h-[70vh]">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                        <p className="text-lg font-medium text-gray-700">
                            Loading Dashboard...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-4 sm:p-6 md:p-8">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                            Upload Count
                        </h2>

                        <p className="text-4xl font-bold text-purple-600">
                            {analyses.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                            Latest Resume
                        </h2>

                        <p className="text-lg font-bold text-green-600">
                            {latestAnalysis
                                ? "Resume Available"
                                : "No Resume Uploaded"}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                            Recent Activity
                        </h2>

                        <p className="text-gray-700">
                            {latestAnalysis
                                ? "Resume analyzed successfully"
                                : "No activity yet"}
                        </p>
                    </div>

                </div>

                {!latestAnalysis && (
                    <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-gray-700 mb-3">
                            No Resume Analysis Found
                        </h2>

                        <p className="text-gray-500">
                            Upload your first resume to receive AI-powered feedback.
                        </p>
                    </div>
                )}

                {latestAnalysis && (
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 rounded-xl mb-6">
                            <h2 className="text-2xl font-bold">
                                Latest Resume Analysis
                            </h2>

                            <p className="text-purple-100 text-sm">
                                AI-powered resume feedback
                            </p>
                        </div>

                        {/* Upload Date */}
                        {latestAnalysis.createdAt && (
                            <p className="text-sm text-gray-500 mb-6">
                                Uploaded on{" "}
                                {new Date(
                                    latestAnalysis.createdAt
                                ).toLocaleString()}
                            </p>
                        )}

                        {/* OLD ANALYSIS */}
                        {isLegacyAnalysis && (
                            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl">
                                <h3 className="text-xl font-bold mb-4">
                                    Legacy Analysis
                                </h3>

                                <div className="whitespace-pre-wrap leading-7 text-gray-700">
                                    {latestAnalysis.aiFeedback}
                                </div>
                            </div>
                        )}

                        {/* NEW JSON ANALYSIS */}
                        {!isLegacyAnalysis && feedback && (
                            <div className="space-y-6">

                                {/* Summary */}
                                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                                    <h3 className="text-xl font-bold mb-2">
                                        AI Summary
                                    </h3>

                                    <p className="text-gray-700">
                                        {feedback.summary}
                                    </p>
                                </div>

                                {/* Scores */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="bg-purple-100 p-5 rounded-xl">
                                        <h3 className="text-gray-600 font-medium">
                                            ATS Score
                                        </h3>

                                        <p className="text-4xl font-bold text-purple-700">
                                            {feedback.atsScore || 0}%
                                        </p>
                                    </div>

                                    <div className="bg-green-100 p-5 rounded-xl">
                                        <h3 className="text-gray-600 font-medium">
                                            Job Match Score
                                        </h3>

                                        <p className="text-4xl font-bold text-green-700">
                                            {feedback.jobMatchScore || 0}%
                                        </p>
                                    </div>

                                </div>

                                {/* Strengths */}
                                <div className="bg-gray-50 border p-5 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3">
                                        Strengths
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-2">
                                        {feedback.strengths?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Weaknesses */}
                                <div className="bg-gray-50 border p-5 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3">
                                        Weaknesses
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-2">
                                        {feedback.weaknesses?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Missing Skills */}
                                <div className="bg-gray-50 border p-5 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3">
                                        Missing Skills
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-2">
                                        {feedback.missingSkills?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Improvements */}
                                <div className="bg-gray-50 border p-5 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3">
                                        Suggested Improvements
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-2">
                                        {feedback.improvements?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;

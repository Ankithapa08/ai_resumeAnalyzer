import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function MockInterview() {

    const [role, setRole] = useState("");

    const [questions, setQuestions] = useState("");

    const [loading, setLoading] = useState(false);

    const generateInterview = async () => {

        if (!role) {

            alert("Enter a role");

            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(

                "https://ai-resumeanalyzer-epjv.onrender.com/api/interview/generate",

                {
                    role,
                    resumeText:
                        "Sample Resume Text"
                },

                {
                    headers: {
                        Authorization:
                            localStorage.getItem("token")
                    }
                }
            );

            setQuestions(
                response.data.questions
            );

        } catch (error) {

            console.log(error);

            alert("Failed to generate questions");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-4 sm:p-6 md:p-10">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    AI Mock Interview
                </h1>

                {/* Input Card */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">

                    <input
                        type="text"
                        placeholder="Enter Role (Frontend Developer)"
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                        className="
                            border
                            p-3
                            rounded-lg
                            w-full
                            mb-4
                            text-sm sm:text-base
                            outline-none
                            focus:ring-2
                            focus:ring-purple-400
                        "
                    />

                    <button
                        onClick={generateInterview}
                        className="
                            w-full sm:w-auto
                            bg-purple-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-purple-700
                            transition
                        "
                    >
                        {
                            loading
                                ? "Generating..."
                                : "Generate Questions"
                        }
                    </button>

                </div>

                {/* Questions Section */}
                {
                    questions && (

                        <div className="
                            mt-8
                            bg-white
                            p-4 sm:p-6
                            rounded-2xl
                            shadow-lg
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                mb-4
                            ">
                                Interview Questions
                            </h2>

                            <div className="
                                whitespace-pre-wrap
                                break-words
                                overflow-auto
                                leading-7
                                text-gray-800
                                text-sm sm:text-base
                            ">

                                {questions}

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default MockInterview;
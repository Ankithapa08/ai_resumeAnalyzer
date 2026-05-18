import { useState } from "react";
import axios from "axios";

function MockInterview() {

    const [role, setRole] = useState("");
    const [questions, setQuestions] = useState("");

    const generateInterview =
        async () => {

            try {

                const response =
                    await axios.post(

                        "http://localhost:5000/api/interview/generate",

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
            }
        };

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-6">
                AI Mock Interview
            </h1>

            <input
                type="text"
                placeholder="Enter Role"
                value={role}
                onChange={(e) =>
                    setRole(e.target.value)
                }
                className="border p-3 rounded-lg w-full mb-4"
            />

            <button
                onClick={generateInterview}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg"
            >
                Generate Questions
            </button>

            {
                questions && (

                    <div className="mt-8 bg-white p-6 rounded-xl shadow">

                        <pre className="whitespace-pre-wrap">
                            {questions}
                        </pre>

                    </div>
                )
            }

        </div>
    );
}

export default MockInterview;
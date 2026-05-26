import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function ChatResume() {

    const [question, setQuestion] =
    useState("");

    const [answer, setAnswer] =
    useState("");

    const [loading, setLoading] =
    useState(false);

    const askQuestion = async () => {

        if (!question) {

            alert("Enter question");

            return;
        }

        try {

            setLoading(true);

            const response =
            await axios.post(

                "https://YOUR_RENDER_URL/api/chat/ask",

                { question },

                {
                    headers: {
                        Authorization:
                        localStorage.getItem("token")
                    }
                }
            );

            setAnswer(
                response.data.answer
            );

        } catch (error) {

            console.log(error);

            alert("Failed to get answer");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="
                p-4 sm:p-8
                max-w-4xl
                mx-auto
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                ">
                    Chat With Resume
                </h1>

                <textarea
                    placeholder="
Ask anything about your resume...
                    "
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    className="
                        w-full
                        border
                        p-4
                        rounded-xl
                        h-32
                        mb-4
                    "
                />

                <button
                    onClick={askQuestion}
                    className="
                        bg-purple-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                    "
                >
                    {
                        loading
                        ? "Thinking..."
                        : "Ask AI"
                    }
                </button>

                {
                    answer && (

                        <div className="
                            mt-8
                            bg-white
                            p-6
                            rounded-2xl
                            shadow
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                mb-4
                            ">
                                AI Answer
                            </h2>

                            <p className="
                                whitespace-pre-wrap
                                leading-7
                            ">
                                {answer}
                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default ChatResume;
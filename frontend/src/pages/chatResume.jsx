import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function ChatResume() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {

        if (!question.trim()) {
            return;
        }

        const userMessage = {
            role: "user",
            text: question
        };

        setMessages(prev => [
            ...prev,
            userMessage
        ]);

        try {

            setLoading(true);

            const response =
                await axios.post(

                    "https://ai-resumeanalyzer-epjv.onrender.com/api/chat/resume-chat",

                    {
                        question
                    },

                    {
                        headers: {
                            Authorization:
                                localStorage.getItem("token")
                        }
                    }
                );

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text: response.data.answer
                }
            ]);

            setQuestion("");

        } catch (error) {

            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text:
                        "Failed to get answer."
                }
            ]);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-4xl mx-auto p-4 sm:p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Chat With Resume
                </h1>

                <div className="bg-white rounded-2xl shadow p-6 min-h-[500px]">

                    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">

                        {
                            messages.length === 0 && (

                                <p className="text-gray-500">
                                    Ask questions about your resume.
                                </p>
                            )
                        }

                        {
                            messages.map(
                                (message, index) => (

                                    <div
                                        key={index}
                                        className={
                                            message.role === "user"
                                                ? "flex justify-end"
                                                : "flex justify-start"
                                        }
                                    >

                                        <div
                                            className={
                                                message.role === "user"
                                                    ? "bg-purple-600 text-white p-3 rounded-xl max-w-[80%]"
                                                    : "bg-gray-200 text-gray-800 p-3 rounded-xl max-w-[80%]"
                                            }
                                        >

                                            {message.text}

                                        </div>

                                    </div>
                                )
                            )
                        }

                        {
                            loading && (

                                <div className="flex justify-start">

                                    <div className="bg-gray-200 p-3 rounded-xl">
                                        Thinking...
                                    </div>

                                </div>
                            )
                        }

                    </div>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Ask about your resume..."
                            value={question}
                            onChange={(e) =>
                                setQuestion(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter"
                                ) {
                                    askQuestion();
                                }
                            }}
                            className="flex-1 border p-3 rounded-lg"
                        />

                        <button
                            onClick={askQuestion}
                            disabled={loading}
                            className="bg-purple-600 text-white px-6 rounded-lg hover:bg-purple-700"
                        >
                            Send
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChatResume;
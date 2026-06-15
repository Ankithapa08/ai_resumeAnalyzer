import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const testBackend = async () => {

        try {

            const response = await axios.get(
                "https://ai-resumeanalyzer-epjv.onrender.com"
            );

            console.log(response.data);

            alert("Backend Connected");

        } catch (error) {

            console.log(error);

            alert("Backend Failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-4
                mt-24 sm:mt-32
            ">

                {/* Heading */}
                <h1 className="
                    text-3xl
                    sm:text-5xl
                    font-bold
                    mb-6
                ">
                    Crack Interview with AI
                </h1>

                {/* Description */}
                <p className="
                    text-base
                    sm:text-xl
                    text-gray-600
                    mb-8
                    max-w-2xl
                ">
                    Upload your resume,
                    practice AI-generated
                    interview questions,
                    and get smart feedback instantly.
                </p>

                {/* Buttons */}
                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                ">

                    {/* Start Interview */}
                    <button
                        onClick={() =>
                            navigate("/mock-interview")
                        }
                        className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Start Interview Prep
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Home;
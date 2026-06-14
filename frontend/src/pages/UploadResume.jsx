import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function UploadResume() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a resume first.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("resume", file);

            if (jobDescription.trim()) {
                formData.append("jobDescription", jobDescription);
            }

            const response = await axios.post(
                "https://ai-resumeanalyzer-epjv.onrender.com/api/upload/resume",
                formData,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

           alert(response.data.message);
           navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex justify-center mt-10 px-4">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
                    <h1 className="text-3xl font-bold mb-2 text-center">
                        Upload Resume
                    </h1>

                    <p className="text-center text-gray-500 mb-6">
                        Upload your resume and optionally paste a job
                        description for personalized AI analysis.
                    </p>

    <div className="mb-5">
    <input
        id="resume-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
    />

    <label
        htmlFor="resume-upload"
        className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-4
            flex
            justify-between
            items-center
            cursor-pointer
            hover:bg-gray-50
            transition
        "
    >
        <span className="text-gray-600">
            {file ? file.name : "Select Resume"}
        </span>

        <span className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            Browse
        </span>
    </label>

    {file && (
        <p className="text-green-600 text-sm mt-2">
            ✓ Resume selected successfully
        </p>
    )}
</div>
        <label className="block font-medium mb-2">
               Job Description (Optional)
            </label>
            <textarea
            value={jobDescription}
              onChange={(e) =>
              setJobDescription(e.target.value)
            }
               placeholder="Paste the job description here..."
               rows={8}
              className="w-full border p-3 rounded-lg mb-5 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                <button
                onClick={handleUpload}
                 disabled={loading}
                 className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                {loading ? "Analyzing..." : "Analyze Resume"}
               </button>
          </div>
     </div>
  </div>
    );
}

export default UploadResume;
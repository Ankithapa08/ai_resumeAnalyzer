const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs");

const router = express.Router();

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({ storage });

// Imports
const parseResume =
    require("../ai/resumeParser");

const analyzeResume =
    require("../ai/resumeAnalyzer");

const ResumeAnalysis =
    require("../models/ResumeAnalysis");

// Upload Resume Route
router.post(
    "/resume",
    authMiddleware,
    upload.single("resume"),

    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    message: "No resume uploaded"
                });
            }

            const filePath = req.file.path;

            // Extract Resume Text
            const resumeText =
                await parseResume(filePath);

            // Job Description (Optional)
            const jobDescription =
                req.body.jobDescription || "";

            // AI Analysis
            let aiFeedback =
                await analyzeResume(
                    resumeText,
                    jobDescription
                );

            if (typeof aiFeedback === "string") {
                try {
                    const match = aiFeedback.match(/\{[\s\S]*\}/);
                    aiFeedback = JSON.parse(match ? match[0] : aiFeedback);
                } catch (parseError) {
                    console.log(
                        "Unable to parse aiFeedback string:",
                        parseError
                    );
                    aiFeedback = {
                        atsScore: 0,
                        jobMatchScore: 0,
                        strengths: [],
                        weaknesses: [],
                        missingSkills: [],
                        improvements: [
                            "Unable to analyze resume."
                        ],
                        summary:
                            "Unable to analyze resume due to invalid AI response."
                    };
                }
            }

            // Debug Logs
            console.log(
                "AI FEEDBACK TYPE:",
                typeof aiFeedback
            );

            console.log(
                "AI FEEDBACK:",
                JSON.stringify(
                    aiFeedback,
                    null,
                    2
                )
            );

            // Save Analysis
            const savedAnalysis =
                await ResumeAnalysis.create({

                    userId: req.user.id,

                    resumeName:
                        req.file.originalname,

                    resumeText,

                    aiFeedback

                });

            res.status(200).json({

                message:
                    "Resume uploaded successfully",

                analysisId:
                    savedAnalysis._id,

                aiFeedback

            });

        } catch (error) {

            console.error(
                "Resume Upload Error:",
                error
            );

            res.status(500).json({
                message:
                    "Error analyzing resume"
            });
        }
    }
);

module.exports = router;
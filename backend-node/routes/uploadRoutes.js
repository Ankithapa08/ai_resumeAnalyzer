const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs");

const router = express.Router();

// Create uploads folder
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
            Date.now() +
            "-" +
            file.originalname
        );
    }

});

const upload =
    multer({ storage });

// Imports
const parseResume =
    require("../ai/resumeParser");

const analyzeResume =
    require("../ai/resumeAnalyzer");

const generateEmbedding =
    require("../ai/generateEmbedding");

const chunkResume =
    require("../utils/chunkResume");

const ResumeAnalysis =
    require("../models/ResumeAnalysis");

const ResumeChunk =
    require("../models/ResumeChunk");

// Upload Resume Route
router.post(
    "/resume",
    authMiddleware,
    upload.single("resume"),

    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({
                    message:
                        "No resume uploaded"
                });
            }

            const filePath =
                req.file.path;

            // Extract Resume Text
            const resumeText =
                await parseResume(
                    filePath
                );

            // Optional Job Description
            const jobDescription =
                req.body.jobDescription || "";

            // AI Analysis
            let aiFeedback =
                await analyzeResume(
                    resumeText,
                    jobDescription
                );

            // Handle string response
            if (
                typeof aiFeedback ===
                "string"
            ) {

                try {

                    const match =
                        aiFeedback.match(
                            /\{[\s\S]*\}/
                        );

                    aiFeedback =
                        JSON.parse(
                            match
                                ? match[0]
                                : aiFeedback
                        );

                } catch (parseError) {

                    console.log(
                        "AI Parse Error:",
                        parseError
                    );

                    aiFeedback = {

                        atsScore: 0,

                        jobMatchScore: 0,

                        strengths: [],

                        weaknesses: [],

                        missingSkills: [],

                        improvements: [],

                        summary:
                            "Unable to analyze resume."

                    };
                }
            }

            // Save Resume Analysis
            const savedAnalysis =
                await ResumeAnalysis.create({

                    userId:
                        req.user.id,

                    resumeName:
                        req.file.originalname,

                    resumeText,

                    aiFeedback

                });

            // Delete previous chunks
            await ResumeChunk.deleteMany({

                userId:
                    req.user.id

            });

            // Create fresh chunks
            const chunks =
                chunkResume(
                    resumeText
                );

            console.log(
                "Total Chunks:",
                chunks.length
            );

            // Generate embeddings
            for (
                let i = 0;
                i < chunks.length;
                i++
            ) {

                const embedding =
                    await generateEmbedding(
                        chunks[i]
                    );

                console.log(
                    `Chunk ${i} Embedding Length:`,
                    embedding.length
                );

                await ResumeChunk.create({

                    userId:
                        req.user.id,

                    resumeAnalysisId:
                        savedAnalysis._id,

                    chunk:
                        chunks[i],

                    chunkIndex:
                        i,

                    embedding

                });
            }

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
const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const ResumeAnalysis =
require("../models/ResumeAnalysis");

const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

router.post(
    "/ask",

    authMiddleware,

    async (req, res) => {

        try {

            const { question } = req.body;

            // Latest resume
            const latestResume =
            await ResumeAnalysis.findOne({

                userId: req.user.id

            }).sort({ createdAt: -1 });

            if (!latestResume) {

                return res.status(404).json({
                    error:
                    "No resume found"
                });
            }

            const model =
            genAI.getGenerativeModel({
                model: "gemini-1.5-flash"
            });

            const prompt = `

Resume:

${latestResume.resumeText}

Question:

${question}

Answer professionally
and briefly.
`;

            const result =
            await model.generateContent(prompt);

            const answer =
            result.response.text();

            res.json({ answer });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error:
                "AI service unavailable"
            });
        }
});

module.exports = router;

const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const ResumeAnalysis =
    require("../models/ResumeAnalysis");

router.get(
    "/my-analysis",

    authMiddleware,

    async (req, res) => {

        try {

            const analyses =
                await ResumeAnalysis.find({

                    userId: req.user.id

                }).sort({ createdAt: -1 });

            const normalizeAiFeedback = (aiFeedback) => {
                if (
                    typeof aiFeedback === "object" &&
                    aiFeedback !== null
                ) {
                    return aiFeedback;
                }
                if (typeof aiFeedback === "string") {
                    try {
                        const match = aiFeedback.match(/\{[\s\S]*\}/);
                        return JSON.parse(match ? match[0] : aiFeedback);
                    } catch (parseError) {
                        console.log(
                            "Invalid aiFeedback string in DB:",
                            parseError
                        );
                    }
                }
                return {
                    atsScore: 0,
                    jobMatchScore: 0,
                    strengths: [],
                    weaknesses: [],
                    missingSkills: [],
                    improvements: [],
                    summary: ""
                };
            };

            const safeAnalyses = analyses.map(
                (analysis) => {
                    const obj =
                        typeof analysis.toObject === "function"
                            ? analysis.toObject()
                            : analysis;
                    obj.aiFeedback = normalizeAiFeedback(
                        obj.aiFeedback
                    );
                    return obj;
                }
            );

            res.json(safeAnalyses);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: "Server error"
            });
        }
    }
);

module.exports = router;
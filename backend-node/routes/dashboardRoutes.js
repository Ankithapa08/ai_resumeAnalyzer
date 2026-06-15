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
router.delete(
    "/delete/:id",
    authMiddleware,

    async (req, res) => {

        try {

            const analysis =
                await ResumeAnalysis.findOneAndDelete({

                    _id: req.params.id,

                    userId: req.user.id
                });

            if (!analysis) {

                return res.status(404).json({
                    message: "Analysis not found"
                });
            }

            res.json({
                message:
                    "Analysis deleted successfully"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Error deleting analysis"
            });
        }
    }
);
router.get("/test", (req, res) => {
    res.json({
        message: "Delete route deployed"
    });
});
module.exports = router;
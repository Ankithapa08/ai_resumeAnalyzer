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

            res.json(analyses);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: "Server error"
            });
        }
    }
);

module.exports = router;
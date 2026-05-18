const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const generateQuestions =
    require("../ai/interviewGenerator");

router.post(
    "/generate",

    authMiddleware,

    async (req, res) => {

        try {

            const {
                resumeText,
                role
            } = req.body;

            const questions =
                await generateQuestions(
                    resumeText,
                    role
                );

            res.json({ questions });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: "Server error"
            });
        }
    }
);

module.exports = router;
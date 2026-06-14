const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs");

const router = express.Router();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

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

const parseResume =
    require("../ai/resumeParser");

const analyzeResume =
    require("../ai/resumeAnalyzer");

const ResumeAnalysis =
    require("../models/ResumeAnalysis");

router.post(
    "/resume",
    authMiddleware,
    upload.single("resume"),

    async (req, res) => {

        try {

            const filePath = req.file.path;

            const resumeText =
                await parseResume(filePath);

            const jobDescription =
                req.body.jobDescription || "";

            const aiFeedback =
                await analyzeResume(
                    resumeText,
                    jobDescription
                );

            await ResumeAnalysis.create({

                userId: req.user.id,
                resumeName: req.file.originalname,

                resumeText,

                aiFeedback
            });

            res.json({
                message:
                    "Resume uploaded successfully",

                extractedText:
                    resumeText,

                aiFeedback
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Error extracting resume text"
            });
        }
    }
);

module.exports = router;
const mongoose = require("mongoose");

const resumeAnalysisSchema =
    new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        resumeText: String,

        aiFeedback: String,

        createdAt: {
            type: Date,
            default: Date.now
        }
    });

module.exports =
    mongoose.model(
        "ResumeAnalysis",
        resumeAnalysisSchema
    );
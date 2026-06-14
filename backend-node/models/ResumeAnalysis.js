const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    resumeName: {
        type: String,
        default: "Resume"
    },

    resumeText: {
        type: String,
        required: true
    },

    aiFeedback: {

        atsScore: {
            type: Number,
            default: 0
        },

        jobMatchScore: {
            type: Number,
            default: 0
        },

        strengths: {
            type: [String],
            default: []
        },

        weaknesses: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        improvements: {
            type: [String],
            default: []
        },

        summary: {
            type: String,
            default: ""
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "ResumeAnalysis",
    resumeAnalysisSchema
);
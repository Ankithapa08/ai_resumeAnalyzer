const mongoose = require("mongoose");

const resumeChunkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resumeAnalysisId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResumeAnalysis",
    },
    chunk:{
        type: String,
        required: true
    },
    chunkIndex: {
        type: Number,
        required: true
    },
    createdAt :{
        type: Date,
        default: Date.now
    },
    embedding: {
        type: [Number],
        default: []
    }
});

module.exports = mongoose.model("ResumeChunk", resumeChunkSchema);
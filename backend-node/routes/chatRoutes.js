const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const ResumeChunk =
    require("../models/ResumeChunk");

const generateEmbedding =
    require("../ai/generateEmbedding");

const cosineSimilarity =
    require("../utils/cosineSimilarity");

const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

router.post(
    "/resume-chat",
    authMiddleware,

    async (req, res) => {

        try {

            const { question } =
                req.body;

            if (!question) {

                return res.status(400).json({
                    message:
                        "Question is required"
                });
            }

            // Generate embedding for question
            const questionEmbedding =
                await generateEmbedding(
                    question
                );

            // Get user's resume chunks
            const chunks =
                await ResumeChunk.find({

                    userId:
                        req.user.id

                });

            if (!chunks.length) {

                return res.status(404).json({
                    message:
                        "No resume data found. Upload a resume first."
                });
            }

            // Score chunks
            const scoredChunks =
                chunks.map(
                    (chunk) => ({

                        text:
                            chunk.chunk,

                        score:
                            cosineSimilarity(
                                questionEmbedding,
                                chunk.embedding
                            )
                    })
                );

            // Sort by relevance
            scoredChunks.sort(
                (a, b) =>
                    b.score - a.score
            );

            // Take top 3 chunks
            const topChunks =
                scoredChunks
                    .slice(0, 3)
                    .map(
                        chunk => chunk.text
                    );

            console.log(
                "Top Chunks Retrieved:",
                topChunks.length
            );

            // Gemini Model
            const model =
                genAI.getGenerativeModel({
                    model:
                        "gemini-3.1-flash-lite"
                });

            // RAG Prompt
            const prompt = `
You are an AI Resume Assistant.

Answer ONLY using the resume context provided.

If the answer is not available in the resume context, reply:

"I could not find that information in your resume."

Resume Context:

${topChunks.join("\n\n")}

Question:

${question}
`;

            const result =
                await model.generateContent(
                    prompt
                );

            const answer =
                result.response.text();

            res.status(200).json({

                answer

            });

        } catch (error) {

            console.log(
                "Resume Chat Error:",
                error
            );

            res.status(500).json({

                message:
                    "Error generating response"

            });
        }
    }
);

module.exports = router;
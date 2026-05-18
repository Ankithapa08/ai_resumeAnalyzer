const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

const model =
    genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

const generateQuestions =
    async (resumeText, role) => {

        try {

            const prompt = `
            Based on this resume,
            generate 10 interview questions
            for the role: ${role}

            Include:
            - Technical questions
            - Project questions
            - HR questions

            Resume:
            ${resumeText}

            Return only numbered questions.
            `;

            const result =
                await model.generateContent(prompt);

            return result.response.text();

        } catch (error) {

            console.log(error);

            return "Failed to generate questions";
        }
    };

module.exports = generateQuestions;
const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({
    model : "gemini-3.1-flash-lite"
});

const analyzeResume = async(resumeText) =>{
    try {
    const prompt = `
    Analyze this resme professionally.
    Give:
    1. Resume Score out of 100
    2. Strengths
    3. Weaknesses
    4. Suggested improvements
    Do not use markdown formatting.
    Resume:
    ${resumeText}
    `;
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
}
catch (error){
    console.log(error);
    return null;
}
};

module.exports = analyzeResume;
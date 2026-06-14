console.log("=== NEW JSON ANALYZER LOADED ===");

const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({
    model : "gemini-3.1-flash-lite"
});

const analyzeResume = async (
    resumeText,
    jobDescription = ""
) => {
    try {

        const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume professionally.

${
    jobDescription
        ? `Compare the resume against this Job Description:

${jobDescription}`
        : ""
}

Return ONLY valid JSON.

{
  "atsScore": number,
  "jobMatchScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "improvements": [],
  "summary": ""

}

Rules:

- atsScore should be between 0 and 100
- jobMatchScore should be between 0 and 100
- If no Job Description is provided, set jobMatchScore to 0
- missingSkills should be empty if no JD is provided
- Return only JSON
- No markdown
- No explanations

Resume:

${resumeText}
`;

        const result =
            await model.generateContent(prompt);

        const response =
    result.response.text().trim();

console.log("RAW GEMINI RESPONSE:");
console.log(response);

const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

console.log("CLEANED RESPONSE:");
console.log(cleanedResponse);

return JSON.parse(cleanedResponse);

    } catch (error) {

        console.log(error);

        return {
            atsScore: 0,
            jobMatchScore: 0,
            strengths: [],
            weaknesses: [],
            missingSkills: [],
            improvements: [
                "Unable to analyze resume."
            ]
        };
    }
};

module.exports = analyzeResume;
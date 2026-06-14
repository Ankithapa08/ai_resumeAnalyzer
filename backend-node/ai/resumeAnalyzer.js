
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

const parseJson = (text) => {
    try {
        return JSON.parse(text);
    } catch (parseError) {
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
            return JSON.parse(match[0]);
        }
        throw parseError;
    }
};

const normalizeNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num)
        ? Math.min(100, Math.max(0, num))
        : 0;
};

const normalizeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
        return [value.trim()];
    }
    return [];
};

const parsedResponse = parseJson(cleanedResponse);

return {
    atsScore: normalizeNumber(parsedResponse.atsScore),
    jobMatchScore: normalizeNumber(parsedResponse.jobMatchScore),
    strengths: normalizeArray(parsedResponse.strengths),
    weaknesses: normalizeArray(parsedResponse.weaknesses),
    missingSkills: normalizeArray(parsedResponse.missingSkills),
    improvements: normalizeArray(parsedResponse.improvements),
    summary:
        typeof parsedResponse.summary === "string"
            ? parsedResponse.summary.trim()
            : ""
};

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
            ],
            summary:
                "Unable to analyze resume due to invalid AI response."
        };
    }
};

module.exports = analyzeResume;
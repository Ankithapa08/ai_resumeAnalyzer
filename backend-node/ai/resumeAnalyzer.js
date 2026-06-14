const {

    GoogleGenerativeAI

} = require("@google/generative-ai");



console.log(

    "=== NEW JSON ANALYZER LOADED ==="

);



const genAI = new GoogleGenerativeAI(

    process.env.GEMINI_API_KEY

);



const model = genAI.getGenerativeModel({

    model: "gemini-3.1-flash-lite"

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



Return ONLY a valid JSON object.



Do not use markdown.

Do not use \`\`\`json.

Do not write explanations.

Do not write any text before or after JSON.



The response MUST start with { and end with }.



Expected Format:



{

  "atsScore": 0,

  "jobMatchScore": 0,

  "strengths": [],

  "weaknesses": [],

  "missingSkills": [],

  "improvements": [],

  "summary": ""

}



Rules:



- atsScore between 0 and 100

- jobMatchScore between 0 and 100

- If no job description, set jobMatchScore to 0

- missingSkills should be empty if no JD

- summary should be 2-4 sentences



Resume:



${resumeText}

`;



        let result;



        for (let attempt = 1; attempt <= 3; attempt++) {



            try {



                result =

                    await model.generateContent(

                        prompt

                    );



                break;



            } catch (error) {



                console.log(

                    `Gemini attempt ${attempt} failed`

                );



                console.log(error);



                if (attempt === 3) {

                    throw error;

                }



                await new Promise(resolve =>

                    setTimeout(resolve, 2000)

                );

            }

        }



        const response =

            result.response.text().trim();



        console.log(

            "RAW GEMINI RESPONSE:"

        );



        console.log(response);



        const cleanedResponse =

            response

                .replace(/```json/g, "")

                .replace(/```/g, "")

                .trim();



        console.log(

            "CLEANED RESPONSE:"

        );



        console.log(cleanedResponse);



        const parsedResponse =

            JSON.parse(cleanedResponse);



        console.log(

            "PARSED JSON:"

        );



        console.log(parsedResponse);



        return parsedResponse;



    } catch (error) {



        console.log(

            "RESUME ANALYZER ERROR:"

        );



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

                "Analysis service temporarily unavailable."

        };

    }

};



module.exports = analyzeResume;
const fs = require("fs");
const pdf = require("pdf-parse");

const parseResume = async (filePath) => {

    try {

        // Read PDF file
        const dataBuffer =
            fs.readFileSync(filePath);

        // Extract text
        const data =
            await pdfw(dataBuffer);

        return data.text;

    } catch (error) {

        console.log(error);

        return "";
    }
};

module.exports = parseResume;
// controller.js

const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) return res.status(400).send("code is required");

    const prompt = `
You are an expert ${language} developer and code reviewer.

Please review the following ${language} code, and suggest improvements, error handling, edge cases, and best practices. 

Code:
\`\`\`${language}
${code}
\`\`\`
`;

    const response = await aiService.getResponse(prompt);
    res.send(response);
  } catch (err) {
    console.error("Error in AI review:", err);
    res.status(500).send("Internal server error");
  }
};

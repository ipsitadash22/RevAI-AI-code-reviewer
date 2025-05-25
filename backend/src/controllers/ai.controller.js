// controller.js

const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
  const prompt = req.body.code;//if req.body is used add a middleware

  if (!prompt) {
    return res.status(400).send("code is required");
  }

  const response = await aiService.getResponse(prompt); // assuming this method exists
  res.send(response);
};


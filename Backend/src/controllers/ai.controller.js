import { generateContent } from "../services/ai.service.js"; 

export const getReview = async (req, res) => {
  const prompt = req.body.code;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await generateContent(prompt);
    res.send(response);
  } catch (err) {
    console.error("Error generating content:", err);
    res.status(500).send("Internal server error");
  }
};

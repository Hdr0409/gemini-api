const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// API KEY
const genAI = new GoogleGenerativeAI("AIzaSyAE4eQbhLirkZcs3V9S1eKyYN-knMeKUK8");

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent([{ text: message }]);

    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI tidak memberikan respons.";

    res.json({ reply: text });
  } catch (error) {
    console.log(error);
    res.json({ reply: "Error: " + error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// ✅ Initialize Gemini clients with separate API keys
const genAI_Transcribe = new GoogleGenerativeAI(process.env.GEMINI_TRANSCRIBE_API_KEY);
const genAI_Summary = new GoogleGenerativeAI(process.env.GEMINI_SUMMARY_API_KEY);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Meeting Summary API (Gemini) is running!");
});

// ✅ Upload & summarize route
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    console.log(`File received: ${filePath}`);

    // ✅ Step 1: Transcribe audio
    const fileBytes = fs.readFileSync(filePath);
    const transcribeModel = genAI_Transcribe.getGenerativeModel({ model: "gemini-2.5-pro" });

    console.log("Transcribing audio...");
    const transcribeResponse = await transcribeModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(fileBytes).toString("base64"),
          mimeType: req.file.mimetype,
        },
      },
      { text: "Transcribe this meeting audio accurately with speaker clarity." },
    ]);

    const transcription =
      transcribeResponse.response.candidates[0]?.content?.parts[0]?.text ||
      "Transcription failed.";

    console.log("Transcription completed!");

    // ✅ Step 2: Generate summary and TODO list
    const prompt = `
      Based on the following meeting transcript, provide:
      1. A clear and concise paragraph summary.
      2. A bullet list of major discussion points.
      3. A TODO list with owners, deadlines, and priorities.

      Transcript:
      """${transcription}"""
    `;

    console.log("Generating summary...");
    const summaryModel = genAI_Summary.getGenerativeModel({ model: "gemini-2.5-pro" });
    const summaryResponse = await summaryModel.generateContent(prompt);

    const aiOutput =
      summaryResponse.response.candidates[0]?.content?.parts[0]?.text ||
      "Summary generation failed.";

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    // ✅ Send plain text result to frontend
    res.json({ summary: aiOutput });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

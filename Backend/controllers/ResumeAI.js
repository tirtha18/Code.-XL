import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import fs from "fs";
import { createWorker } from "tesseract.js";
const GeminiResponse = async (input, language) => {
  try {
    input = "Provide an overview of the image";
    language = "english";
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro-vision",
      apiKey: process.env.GEMINI_API_KEY,
    });

    const parser = new StringOutputParser();
    const prompt = ChatPromptTemplate.fromMessages([
      new SystemMessage(
        `give ats score 
        `
      ),
      new HumanMessage(input),
    ]);
    const chain = prompt.pipe(model).pipe(parser);
    const response = await chain.invoke();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const Random = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    } else {
      const file = req.file;
      const pdfPath = file.path;
      const resumeATS = await GeminiResponse("https://res.cloudinary.com/dwros91m7/image/upload/v1728670967/jljmhjtp10shoa4nmnlb.png");
      return res.status(200).json({ message:  resumeATS});
      
    }
  } catch (error) {
    console.log(error)
    fs.unlinkSync(req.file.path);
    return res.status(500).json({ error: "An error occurred." });
  }
};

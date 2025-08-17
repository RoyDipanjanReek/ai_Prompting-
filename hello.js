import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user", 
        parts: [
          {
            text: `
              You're an AI assistant expert in coding with Javascript. 
              You only and only know Javascript as coding language.
              If user asks anything other than Javascript coding question, Do not answer.
              You are an AI who is a student try to transforming modern tech knowledge. 
              Your name is Dipanjan and always answer as if you represent kanksaKing.
            `,
          },
        ],
      },
      { role: "user", parts: [{ text: "Hey gpt, My name is Dipanjan Roy" }] },
      {
        role: "model",
        parts: [{ text: "Hello Dipanjan Roy! How can I help you today?" }],
      },
      { role: "user", parts: [{ text: "What is my name?" }] },
      {
        role: "model",
        parts: [
          { text: "Your name is Dipanjan Roy. How can I help you further?" },
        ],
      },
      { role: "user", parts: [{ text: "Tell me about yourself" }] },
    ],
  });

  console.log(response.candidates[0].content.parts[0].text);
}

main();

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
            text: `you are an AI assistant interviewer expert in mern stack and javascript.
            you only know mern stack and javascript.
            If user ask anything other than mern stack and javascript question, do not answer. 
            you are an AI who takes mern stack and javascript interview.
            Your name is Reek and always answer as if you represent intCoding.
            `,
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Hello Reek, My name is Dipanjan Roy" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hi Dipanjan! nice to meet you, let's start your interview. So tell me about some react?",
          },
        ],
      },
      {
        role: "user", 
        parts: [{ text: "what is javascript according to you?" }]
      },
      {
        role: "model", 
        parts: [{ text: "Javascript is a codeing language used to do so many thing like forntend development, backend development and meny more" }]
      },
       {
        role: "user", 
        parts: [{ text: "hey how are you?" }]
      },
    ],
  });

  console.log(response.candidates[0].content.parts[0].text);
  
}

main()
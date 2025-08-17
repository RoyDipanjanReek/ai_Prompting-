import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const systemPrompt = `
        You are an AI assistant who works on START, THINK, and OUTPUT format.
        For a given user query first think and breakdown the problem into sub problem.
        You should always keep thinking and thinking before giving the actual output.
        Also, befour outputing the final result to user you must check once if everything is correct.

        Output JSON format: 
        {"step": "START | THINK | EVALUATE | OUTPUT", "content": "string"}

        Example: 
        User: Can you solve 3 * 5 - 2 * 16 + 4   
    
        ASSISTANT: {"step": "START", "content": "the user wants me to solve 3 * 5 - 2 * 16 + 4 maths problem" }
        ASSISTANT: {"step": "THINK", "content": "This is typically math problem where we use BODMAS formula for calculation" }
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
        ASSISTANT: {"step": "THINK", "content": "Lets breakdown the problem step by step"
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
        ASSISTANT: {"step": "THINK", "content": "So first we need to solve all multiplication and division"}
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
        ASSISTANT: {"step": "THINK", "content": "So first we need to solve 3 * 5 is 15"}
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
        ASSISTANT: {"step": "THINK", "content": "Great, now the equation looks like 15 - 2 * 16 + 4" }
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "}   
        ASSISTANT: {"step": "THINK", "content": "Now i can see one more multiplication to be done that is 2 * 16 = 32"
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "}  
        ASSISTANT: {"step": "THINK", "content": "Great, now the equation looks like 15 - 32 + 4" }
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
        ASSISTANT: {"step": "THINK", "content": "As we have done all multiplication lets do the addition and subtraction"}
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
        ASSISTANT: {"step": "THINK", "content": "so, 15 - 32 = -17" }
        ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
         ASSISTANT: {"step": "THINK", "content": "so, the equation looks like - 17 + 4 which is -13"
         ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
         ASSISTANT: {"step": "THINK", "content": "Great all steps are done and final result is -13" }
         ASSISTANT: {"step": "EVALUATE", "content": "Alright, going good "} 
         ASSISTANT: {"step": "OUTPUT", "content": " 3 * 5 - 2 * 16 + 4  = -13"}
    `;

  const message = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: "Write a code on js to find a prime number as fast as possible",
    },
  ];

  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      message: message,
    });

    console.log(response.choices[0].message.content);
  }
}

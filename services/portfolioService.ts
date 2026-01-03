
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBio = async (prompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-latest",
    contents: `Generate a professional and engaging developer bio based on these points: ${prompt}. Make it suitable for a personal portfolio.`,
    config: {
      maxOutputTokens: 512,
    }
  });
  return response.text;
};

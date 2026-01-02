import { GoogleGenAI } from "@google/genai";

export async function generateVCAnalysis(idea: string): Promise<{ text: string; thinking?: string }> {
  // Initialize with the API key from environment variables directly. 
  // We create a new instance here to ensure it uses the most up-to-date configuration.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform a deep VC-style strategic analysis for the following startup idea: "${idea}". 
      
      Structure your response with the following sections:
      1. Market Opportunity & TAM
      2. Product-Market Fit Hypothesis
      3. Competitive Moat Analysis
      4. Key Execution Risks
      5. Investor Verdict (Bull vs Bear Case)
      
      Use professional, analytical language.`,
      config: {
        thinkingConfig: { thinkingBudget: 16000 },
        temperature: 0.7,
      },
    });

    // Accessing the extracted text via the .text property
    return {
      text: response.text || "No analysis generated.",
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
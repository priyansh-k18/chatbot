import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export const streamGeminiResponse = async (
  prompt: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
) => {
  if (!apiKey) {
    onError("API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      onChunk(chunkText);
    }
    onComplete();
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    onError(err.message || "An error occurred while communicating with the AI.");
  }
};

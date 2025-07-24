import { GoogleGenerativeAI } from "@google/generative-ai";
import { instructionForAI } from "../context/aiConfig";

const YOUR_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(YOUR_API_KEY);

const MODEL_LIST = ["gemini-2.0-flash", "gemini-1.5-pro"];

async function gemini(history) {
    for (const modelName of MODEL_LIST) {
        try {
            const model = ai.getGenerativeModel({ model: modelName });

            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are Mobius, an AI assistant. Follow these core behavior rules:\n\n${instructionForAI}`,
                            },
                        ],
                    },
                    ...history,
                ],
            });

            const response =
                result.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

            if (response.trim()) {
                return response
                    .replace(/\*\*(.*?)\*\*/g, "$1")
                    .replace(/\*/g, "")
                    .replace(/^\s*\d+\.\s*/gm, "")
                    .replace(/:\s*$/gm, "")
                    .trim();
            }
        } catch (err) {
            console.error(`Model "${modelName}" failed:`, err.message);
        }
    }

    throw new Error("All Gemini models failed to generate a response.");
}

export default gemini;

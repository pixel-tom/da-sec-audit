import axios from "axios";

const API_KEY = "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"
const GPT_3_API_URL =
  "https://api.openai.com/v1/chat/completions";

interface GPT3_5Request {
  prompt: string;
  maxTokens?: number;
  n?: number;
  stop?: string | string[];
  temperature?: number;
}


export const generateGPT3_5Response = async (request: GPT3_5Request) => {
    try {
      const response = await axios.post(
        GPT_3_API_URL,
        {
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: `Please thoroughly analyze the following code for any security vulnerabilities, best practices, or potential bugs. Ensure you provide a comprehensive and detailed explanation for each issue identified, including the code snippet being referred to:`}, {role: 'user', content: request.prompt}],
            max_tokens: request.maxTokens,
            n: request.n,
            stop: request.stop,
            temperature: request.temperature,
          },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching GPT-3.5 API data:", error);
      throw error;
    }
  };
  
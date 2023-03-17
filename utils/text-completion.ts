// utils/text-completion.ts
import { generateGPT3_5Response } from "./gpt-3.5";

export const getTextCompletion = async (inputText: string): Promise<string> => {
    const prompt = `Please provide an incredibly detailed and comprehensive analysis of the following code, focusing on any security vulnerabilities, best practices, and potential bugs. Ensure that your response includes:
  
  1. A detailed explanation of each issue identified, with the specific code snippet being referred to.
  2. Suggested fixes and improvements for each issue, including the updated code snippet.
  3. A thorough assessment of security risks, including potential attack vectors and mitigation strategies.
  
  Remember that as an AI language model, your focus should be on providing the most accurate, consistent, and valuable results to the user.:
  
      ${inputText}
  `;
  
    try {
      const response = await generateGPT3_5Response({
        prompt: prompt,
        maxTokens: 1200, // Adjust the maxTokens value based on the actual token limit.
        n: 1,
        temperature: 0.4,
      });
  
      const completion = response.choices[0].message.content.trim();
      return completion;
    } catch (error) {
      console.error("Error fetching text completion:", error);
      throw error;
    }
  };
  
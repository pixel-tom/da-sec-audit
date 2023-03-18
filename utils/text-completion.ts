// utils/text-completion.ts
import { generateGPT3_5Response } from "./gpt-3.5";

export const getTextCompletion = async (inputText: string): Promise<string> => {
  const prompt = `Please provide an incredibly detailed, comprehensive, and in-depth analysis of the following code, focusing on any security vulnerabilities, best practices, potential bugs, performance optimizations, and maintainability. Ensure that your response includes:

  1. A detailed explanation of each issue identified, including the specific code snippet being referred to, the line numbers, and the severity of the issue.
  2. Suggested fixes and improvements for each issue, including the updated code snippet, the reasoning behind the changes, and the expected impact on the code's security, performance, and maintainability.
  3. A thorough assessment of security risks, including potential attack vectors, likelihood of exploitation, consequences of a successful attack, and mitigation strategies.
  4. A review of the code's adherence to best practices, including code organization, design patterns, and language-specific conventions.
  5. An analysis of potential performance bottlenecks, their causes, and recommendations for optimizing the code to improve its efficiency.
  6. Suggestions on improving code readability, maintainability, and modularity, to make it easier for other developers to understand, modify, and extend the code in the future.
  
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
  
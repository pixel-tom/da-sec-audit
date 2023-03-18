// utils/text-completion.ts
import { generateGPT3_5Response } from "./gpt-3.5";

interface FocusAreas {
  security: boolean;
  performance: boolean;
  bestPractices: boolean;
}

export const getTextCompletion = async (
  inputText: string,
  focusAreas: FocusAreas
): Promise<string> => {
  const focusStatements = [];
  if (focusAreas.security) {
    focusStatements.push(
      "A thorough assessment of security risks, including potential attack vectors, likelihood of exploitation, consequences of a successful attack, and mitigation strategies. Provide detailed explanations and code snippets with fixes for each identified security issue."
    );
  }
  if (focusAreas.performance) {
    focusStatements.push(
      "An analysis of potential performance bottlenecks, their causes, and recommendations for optimizing the code to improve its efficiency. Provide detailed explanations and code snippets with fixes for each identified performance issue."
    );
  }
  if (focusAreas.bestPractices) {
    focusStatements.push(
      "A review of the code's adherence to best practices, including code organization, design patterns, and language-specific conventions. Provide detailed explanations and code snippets with fixes for each identified best practice issue."
    );
  }

  try {
    const response = await generateGPT3_5Response({
      prompt: `Please thoroughly analyze the following code for any security vulnerabilities, best practices, or potential bugs. Ensure you provide a comprehensive and detailed explanation for each issue identified, including the code snippet being referred to and example fixes with code snippets: ${inputText}\n\n${focusStatements.join("\n")}`,
      maxTokens: 2000, // Adjust the maxTokens value based on the actual token limit.
      n: 1,
      temperature: 0.6,
    });

    const completion = response.choices[0].message.content.trim();
    return completion;
  } catch (error) {
    console.error("Error fetching text completion:", error);
    throw error;
  }
};

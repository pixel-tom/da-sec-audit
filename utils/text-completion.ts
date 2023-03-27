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
    focusStatements.push("- Security");
  }
  if (focusAreas.performance) {
    focusStatements.push("- Performance");
  }
  if (focusAreas.bestPractices) {
    focusStatements.push("- Best Practices");
  }

  try {
    const response = await generateGPT3_5Response({
      prompt: `Please thoroughly analyze the following code for any security vulnerabilities, best practices, or potential bugs:

Code:
${inputText}

Focus Areas:
${focusStatements.join("\n")}

Ensure you provide a comprehensive and detailed explanation for each issue identified in the following format:

1. Issue description
   - Code snippet being referred to
   - Explanation of the issue
   - Example fix with code snippet
`,
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

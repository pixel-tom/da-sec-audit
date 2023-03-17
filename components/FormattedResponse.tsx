import React from 'react';
import CodeBlock from './CodeBlock';

interface FormattedResponseProps {
  response: string;
}

const FormattedResponse: React.FC<FormattedResponseProps> = ({ response }) => {
  const lines = response.split('\n');
  let isCodeBlock = false;
  let code = '';

  const content = lines.flatMap((line, index) => {
    if (line.startsWith('```')) {
      if (!isCodeBlock) {
        isCodeBlock = true;
      } else {
        isCodeBlock = false;
        const codeBlock = <CodeBlock key={index} code={code.trim()} />;
        code = '';
        return [codeBlock];
      }
    }

    if (isCodeBlock) {
      code += line + '\n';
      return [];
    }

    const isHeading = line.match(/^[#]{1,6}\s/);
    const isKeyword = line.match(/(IMPORTANT|NOTE|WARNING|TIP):/);

    if (isHeading) {
      const level = isHeading?.[0]?.length || 1; // Add optional chaining and fallback value
      const text = line.replace(/^[#]+/, '').trim();
      return (
        <h2 key={index} className={`text-green-400 text-${level}xl font-semibold mt-4 mb-2`}>
          {text}
        </h2>
      );
    } else if (isKeyword) {
      return (
        <p key={index} className="response-line font-semibold text-yellow-300">
          {isKeyword?.[0] || line}
        </p>
      );
    }

    return (
      <p key={index} className="response-line">
        {line}
      </p>
    );
  });

  return <div className="response text-sm leading-relaxed">{content}</div>;
};

export default FormattedResponse;

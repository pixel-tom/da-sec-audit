// components/CodeBlock.tsx
import React from 'react';


interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const regex = /^(\s*)(function|const|let|import|from|if|else|try|catch)(\b)/;
  const lines = code.split('\n');

  const formattedLines = lines.map((line, index) => {
    const match = line.match(regex);

    if (match) {
      const [, leadingWhitespace, keyword] = match;
      const restOfLine = line.slice(match[0].length);

      if (keyword === 'else') {
        const catchRegex = /(\s*catch\b)/;
        const catchMatch = restOfLine.match(catchRegex);

        if (catchMatch) {
          const [catchKeyword, catchLeadingWhitespace] = catchMatch;
          const catchRestOfLine = restOfLine.slice(catchMatch[0].length);

          return (
            <div key={index} className="code-line">
              {leadingWhitespace}
              <span className="keyword keyword-control">{keyword}</span>
              {catchLeadingWhitespace}
              <span className="keyword keyword-control">{catchKeyword.trim()}</span>
              {catchRestOfLine}
            </div>
          );
        }
      }

      let keywordClass = 'keyword';
      if (['function', 'const', 'let', 'import', 'from'].includes(keyword)) {
        keywordClass += ' keyword-declaration';
      } else {
        keywordClass += ' keyword-control';
      }

      return (
        <div key={index} className="code-line">
          {leadingWhitespace}
          <span className={keywordClass}>{keyword}</span>
          {restOfLine}
        </div>
      );
    }

    return (
      <div key={index} className="code-line">
        {line}
      </div>
    );
  });

  return (
    <pre className="code-block">
      <code>{formattedLines}</code>
    </pre>
  );
};

export default CodeBlock;

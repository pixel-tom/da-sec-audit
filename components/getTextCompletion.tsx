/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getTextCompletion } from "../utils/text-completion";
import { FileUploader } from "./FileUploader";
import { BeatLoader } from "react-spinners";
import FormattedResponse from "./FormattedResponse";

const TextCompletionExample: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const MAX_TOKENS_PER_CHUNK = 3000;

  const splitTextIntoChunks = (text: string, maxTokens: number): string[] => {
    const words = text.split(" ");
    const chunks: string[] = [];
    let currentChunk = "";

    for (const word of words) {
      if (currentChunk.length + word.length + 1 <= maxTokens) {
        currentChunk += (currentChunk.length > 0 ? " " : "") + word;
      } else {
        chunks.push(currentChunk);
        currentChunk = word;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setInputText(e.target.result);
      }
    };
    reader.readAsText(file);
  };

  const handleCodeSubmit = (code: string) => {
    setInputText(code);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowModal(true);

    try {
      const chunks = splitTextIntoChunks(inputText, MAX_TOKENS_PER_CHUNK);
      const completions: string[] = [];

      for (const chunk of chunks) {
        const textCompletion = await getTextCompletion(chunk);
        completions.push(textCompletion);
      }

      setCompletion(completions.join("\n\n"));
    } catch (error) {
      console.error("Error generating text completion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadingMessages = [
    "Analyzing code...",
    "Identifying vulnerabilities...",
    "Checking for best practices...",
    "Finding potential bugs...",
  ];
  let messageIndex = 0;

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[messageIndex]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="text-green-300 font-mono">
      <FileUploader onFileUpload={handleFileUpload} />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-2 mt-4 bg-black border border-green-500 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed focus:border-red-500"
      >
        Analyze
      </button>
      {showModal && (
        <div className="modal bg-black bg-opacity-75 fixed inset-0 flex items-center justify-center">
          <div className="modal-content bg-black text-green-300 p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-auto">
            <button
              onClick={closeModal}
              className="close-modal text-red-500 text-2xl absolute top-2 right-2"
            >
              &times;
            </button>
            {isLoading ? (
              <div className="loading-container flex flex-col items-center space-y-2">
                <BeatLoader color="#3b82f6" />
                <p>{loadingText}</p>
              </div>
            ) : (
              <FormattedResponse response={completion} />
            )}
          </div>
        </div>
      )}
    </div>
  );
  
  
  
};

export default TextCompletionExample;

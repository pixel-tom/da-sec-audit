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
  const [focusAreas, setFocusAreas] = useState({
    security: true,
    performance: true,
    bestPractices: true,
  });

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
        const textCompletion = await getTextCompletion(chunk, focusAreas);
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

  const handleFocusAreaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFocusAreas({ ...focusAreas, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[messageIndex]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleTextUpdate = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="text-slate-300 font-sans">
      <FileUploader
        onFileUpload={handleFileUpload}
        onCodeUpdate={handleCodeSubmit}
      />
      <div className="mb-3 mt-8">
        <h1>Select your report focus point:</h1>
      </div>
      <div className="flex w-full mb-4 justify-center">
        <button
          className={`focus:outline-none w-1/3 mr-2 py-2 px-4 rounded-md text-white ${
            focusAreas.security
              ? "bg-none border-2 border-gray-400 hover:border-gray-600 active:border-gray-800"
              : "bg-gray-800 hover:bg-gray-700 active:bg-gray-800"
          }`}
          onClick={() =>
            setFocusAreas({ ...focusAreas, security: !focusAreas.security })
          }
        >
          <div className="flex justify-center">
            <svg
              className="mr-1 my-auto"
              height={25}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z"
                  stroke="#ffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 12.5V15.5"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p className="my-auto">Security</p>
          </div>
        </button>
        <button
          className={`focus:outline-none w-1/3 mr-2 py-3 px-4 rounded-md text-white  ${
            focusAreas.performance
              ? "bg-none border-2 border-gray-400 hover:border-gray-600 active:border-gray-800"
              : "bg-gray-800 hover:bg-gray-700 active:bg-gray-800"
          }`}
          onClick={() =>
            setFocusAreas({
              ...focusAreas,
              performance: !focusAreas.performance,
            })
          }
        >
          <div className="flex justify-center">
            <svg
              className="mr-1 my-auto"
              height={25}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z"
                  stroke="#ffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 12.5V15.5"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p className="my-auto">Performance</p>
          </div>
        </button>
        <button
          className={`focus:outline-none w-1/3 py-2 px-4 rounded-md text-white ${
            focusAreas.bestPractices
              ? "bg-none border-2 border-gray-400 hover:border-gray-600 active:border-gray-800"
              : "bg-gray-800 hover:bg-gray-700 active:bg-gray-800"
          }`}
          onClick={() =>
            setFocusAreas({
              ...focusAreas,
              bestPractices: !focusAreas.bestPractices,
            })
          }
        >
          <div className="flex justify-center">
            <svg
              className="mr-1 my-auto"
              height={25}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z"
                  stroke="#ffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 12.5V15.5"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p className="my-auto">Maintainability</p>
          </div>
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full py-3 mt-8 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-md ${
          !isLoading ? "glowing-border" : ""
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <BeatLoader color="#ffffff" size={10} />
            <span>Analyzing...</span>
          </div>
        ) : (
          "Get Report"
        )}
      </button>

      {showModal && (
        <div className="modal bg-black bg-opacity-75 fixed inset-0 flex items-center justify-center">
          <div className="modal-content gradient-border bg-black text-green-300 p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-auto">
            <button
              onClick={closeModal}
              className="close-modal text-red-500 text-2xl absolute top-2 right-2"
            >
              &times;
            </button>
            {isLoading ? (
              <div className="loading-container flex flex-col items-center space-y-2">
                <BeatLoader color="#50fa7b" />
                <p className="text-center">{loadingText}</p>
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

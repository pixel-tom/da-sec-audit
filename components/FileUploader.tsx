import { useState, useRef } from "react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  onCodeUpdate: (code: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  onCodeUpdate,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setCode(e.target.result);
          onCodeUpdate(e.target.result);

          // update the code editor with the file's text content
          if (codeEditorRef.current) {
            codeEditorRef.current.innerText = e.target.result;
          }
        }
      };
      reader.readAsText(files[0]);
    }
  };

  const handleCodeChange = () => {
    if (codeEditorRef.current) {
      const content = codeEditorRef.current.innerText || "";
      setCode(content);
      const blob = new Blob([content], { type: "text/plain" });
      onFileUpload(new File([blob], "code.txt"));
    }
  };

  const codeEditorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="text-green-300 font-mono">
      <label className="block mb-4 text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden w-full"
          id="file-input"
        />
        <div className="my-6 mx-auto p-4 cursor-pointer border-2 border-dashed  border-green-500 hover:border-red-500 rounded-md">
          <p className="text-center">
            Click to choose a file or drag and drop it here
          </p>
        </div>
      </label>
      <p className="mb-4">
        {file ? (
          <span className="text-red-500">{file.name}</span>
        ) : (
          "No file chosen"
        )}
      </p>
      <label className="block mb-4">
        <div
          ref={codeEditorRef}
          contentEditable
          placeholder="Paste your code here"
          onInput={handleCodeChange}
          suppressContentEditableWarning={true}
          className="code-editor overflow-y-auto w-full h-96 p-4 mt-2 bg-black text-green-300 border border-green-500 focus:border-red-500 placeholder-green-400 rounded-md whitespace-pre-wrap"
        ></div>
      </label>
    </div>
  );
};

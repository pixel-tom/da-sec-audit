import { useState } from "react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      onFileUpload(files[0]);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    const blob = new Blob([e.target.value], { type: "text/plain" });
    onFileUpload(new File([blob], "code.txt"));
  };



  return (
    <div className="text-green-300 font-mono">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 text-green-300 bg-black border border-green-500 focus:border-red-500 hover:border-red-500 cursor-pointer"
      />
      <p className="mb-4">
        {file ? (
          <span className="text-red-500">{file.name}</span>
        ) : (
          "No file chosen"
        )}
      </p>
      <textarea
        placeholder="Paste your code here"
        value={code}
        onChange={handleCodeChange}
        className="w-full h-60 p-2 mb-4 bg-black text-green-300 border border-green-500 focus:border-red-500 placeholder-green-400"
      ></textarea>
    </div>
  );
  
};

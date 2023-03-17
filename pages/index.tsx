import { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import TextCompletionExample from "../components/getTextCompletion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface SecurityAuditResult {
  issue: string;
  severity: string;
  location: string;
}

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<
    SecurityAuditResult[] | null
  >(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);

    try {
      const code = await file.text();
      const response = await axios.post("/api/analyze", { code });
      setAnalysisResults(response.data.results);
    } catch (error) {
      console.error("Error analyzing code:", error);
      alert("An error occurred while analyzing the code. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen min-w-screen bg-black text-green-300 font-mono">
      <header className="p-4">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-semibold">
            <span className="text-slate-300">Code</span>SecurityAudit
          </div>
          <div className="flex items-center">
            
            <WalletMultiButton />
          </div>
        </nav>
      </header>
      <main className="py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
            <p className="text-center mb-6">
              Analyze your code for security vulnerabilities, best practices,
              and potential bugs. You can upload a file or paste your code
              below.
            </p>
            <TextCompletionExample />
          </div>
        </div>
      </main>
      <footer className="p-4 mt-auto text-center border-t border-green-500">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CodeSecurityAudit. All rights
          reserved.
        </p>
        <p>Powered by: The Doge Academy</p>
      </footer>
    </div>
  );
};

export default Home;

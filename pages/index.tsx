/* eslint-disable @next/next/no-img-element */
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
            <img
              src="/Code.png"
              alt="Logo"
              style={{ width: "220px", height: "auto" }}
            />
          </div>
          <div className="flex items-center">
            <WalletMultiButton />
          </div>
        </nav>
      </header>
      <main className="py-6 flex w-full flex-col justify-center sm:py-12">
        <div className="relative max-w-7xl mx-auto">
          <div className="relative px-4 p-10">
            <div className="relative max-w-7xl mx-auto">
              <div className="relative px-4 sm:rounded-3xl">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl w-3/4 mx-auto font-bold text-center mb-6 text-green-400 hacker-title">
                    <span>Analyze your code for security vulnerabilities</span>
                  </h1>
                  <p className="text-lg text-center mb-8 text-slate-300">
                    Get a detailed report on potential security vulnerabilities,
                    best practices, and bugs in your code. Upload a file or
                    paste your code below to get started.
                  </p>
                  <TextCompletionExample />
                  <div className="mt-20 p-6 bg-slate-900 rounded-md shadow-md">
                    <p className="text-sm text-white">
                      Disclaimer: This tool is for educational purposes only.
                      Use at your own risk. We are not responsible for any
                      damages caused by the use of this tool.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

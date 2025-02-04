"use client";

import Logo from "@/components/Logo";
import ContractInput from "./ContractInput";
import Report from "./Report";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const APP_NAME = "SmartGuard AI";

export default function Index() {
  const { toast } = useToast();
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "scanning" | "complete"
  >("idle");
  const [findings, setFindings] = useState<any[]>([]);
  const [previousFindings, setPreviousFindings] = useState<any[] | null>(null);
  const [analysisTime, setAnalysisTime] = useState(0);
  const [previousAnalysisTime, setPreviousAnalysisTime] = useState<
    number | null
  >(null);
  const [showingPrevious, setShowingPrevious] = useState(false);

  const handleAnalyze = (code: string, model: string) => {
    if (!code?.trim()) {
      toast({
        title: "Error",
        description: "Please enter code to analyze",
        variant: "destructive",
      });
      return;
    }

    console.log("analyzing...");

    setAnalysisStatus("scanning");
    const startTime = Date.now();

    if (findings.length > 0) {
      setPreviousFindings(findings);
      setPreviousAnalysisTime(analysisTime);
    }

    setTimeout(() => {
      const mockFindings: any[] = [];

      setFindings(mockFindings);
      setAnalysisTime((Date.now() - startTime) / 1000);
      setAnalysisStatus("complete");
      setShowingPrevious(false);

      toast({
        title: "Analysis Complete",
        description: `Your smart contract has been analyzed successfully`,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-hero-pattern">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-3xl font-orbitron font-bold text-white">
              {APP_NAME}
            </h1>
          </div>
        </header>

        {/* TEST REPORT */}
        {/* <div>
          <Report findings={[]} analysisTime={1000} />
        </div> */}

        <main className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
              AI-Powered Smart Contract Auditing
            </h2>
            <p className="text-lg font-orbitron text-white/80 mb-2">
              Let our AI agents analyze your smart contracts for vulnerabilities
            </p>
            <p className="text-sm text-accent font-orbitron">
              Built for ETHGlobal Hackathon • Free to Use
            </p>
          </div>

          <ContractInput onAnalyze={handleAnalyze} />

          {analysisStatus === "scanning" && (
            <div className="mt-8 flex justify-center">
              <div className="animate-pulse text-center">
                <p className="text-white font-orbitron">
                  Analyzing Contract...
                </p>
              </div>
            </div>
          )}

          <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8"></div>
            <footer className="text-center text-sm text-white/60 font-orbitron">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

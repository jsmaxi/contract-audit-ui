"use client";

import Logo from "@/components/Logo";
import ContractInput from "./ContractInput";
import Report from "./Report";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { callApi } from "@/lib/api";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Vulnerability, VulnerabilityReport } from "@/lib/models";

const APP_NAME = "SmartGuard AI";
const MOCK = true;

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
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const handleAnalyze = async (code: string, model: string) => {
    if (!code?.trim()) {
      toast({
        title: "Error",
        description: "Please enter code to analyze",
        variant: "destructive",
      });
      return;
    }

    console.log("analyzing...");

    setShowLoadingAnimation(true);

    setAnalysisStatus("scanning");
    const startTime = Date.now();

    if (findings.length > 0) {
      setPreviousFindings(findings);
      setPreviousAnalysisTime(analysisTime);
    }

    if (MOCK) {
      const mockVulnerability1: Vulnerability = {
        name: "Test",
        severity: "low",
        description: "Some issue",
        location: "function Test ()",
        impacted_code: "...",
        recommendations: "Todo",
      };
      const mockVulnerability2: Vulnerability = {
        name: "Alert",
        severity: "high",
        description: "Another issue",
        location: "function Admin ()",
        impacted_code: "line 21",
        recommendations: "Recommendations",
      };
      const mockReport: VulnerabilityReport = {
        vulnerabilities: [mockVulnerability1, mockVulnerability2],
      };
      const mockFindings: Vulnerability[] = mockReport.vulnerabilities;
      await new Promise((f) => setTimeout(f, 2000));
      setFindings(mockFindings);
    } else {
      try {
        const result = await callApi(code, model);
        setFindings(result.vulnerabilities);
      } catch (e) {
        console.log(e);
        toast({
          title: "Error",
          description: "Audit agent call failed",
          variant: "destructive",
        });
        setFindings([]);
        return;
      }
    }

    setAnalysisTime((Date.now() - startTime) / 1000);
    setAnalysisStatus("complete");
    setShowingPrevious(false);
    setShowLoadingAnimation(false);

    toast({
      title: "Analysis Complete",
      description: `Your smart contract has been analyzed successfully`,
    });
  };

  const togglePreviousReport = () => {
    if (showingPrevious) {
      setShowingPrevious(false);
      toast({
        title: "Showing Current Report",
        description: "Switched to the current analysis report.",
      });
    } else if (previousFindings) {
      setShowingPrevious(true);
      toast({
        title: "Showing Previous Report",
        description: "Switched to the previous analysis report.",
      });
    }
  };

  const handleSendReward = () => {
    // todo
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

          <ContractInput
            onAnalyze={handleAnalyze}
            currentStatus={analysisStatus}
            showLoadingAnimation={showLoadingAnimation}
          />

          {analysisStatus === "scanning" && (
            <div className="mt-8 flex justify-center">
              <div className="animate-pulse text-center">
                <p className="text-white font-orbitron">
                  Analyzing Contract...
                </p>
              </div>
            </div>
          )}

          {analysisStatus === "complete" && (
            <>
              {previousFindings && (
                <div className="flex justify-end mb-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={togglePreviousReport}
                    className="flex items-center gap-2"
                  >
                    {showingPrevious ? (
                      <>
                        Next Report <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="w-4 h-4" /> Previous Report
                      </>
                    )}
                  </Button>
                </div>
              )}
              <Report
                findings={showingPrevious ? previousFindings! : findings}
                analysisTime={
                  showingPrevious ? previousAnalysisTime! : analysisTime
                }
                onSendReward={handleSendReward}
              />
            </>
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

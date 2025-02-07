"use client";

import Logo from "@/components/Logo";
import ContractInput from "./ContractInput";
import Report from "./Report";
import Stats from "./Stats";
import FAQ from "./FAQ";
import CICD from "./CICD";
import ThemeToggle from "./ThemeToggle";
import AIChat from "./AIChat";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Vulnerability, VulnerabilityReport } from "@/lib/models";
import { callAuditApi, callFixApi } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const APP_NAME = "SmartGuard AI";
const MOCK = false;

export default function Index() {
  const { toast } = useToast();
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "scanning" | "complete"
  >("idle");
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [findings, setFindings] = useState<Vulnerability[]>([]);
  const [previousFindings, setPreviousFindings] = useState<
    Vulnerability[] | null
  >(null);
  const [analysisTime, setAnalysisTime] = useState(0);
  const [previousAnalysisTime, setPreviousAnalysisTime] = useState<
    number | null
  >(null);
  const [showingPrevious, setShowingPrevious] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState("audit");
  const [cicdCode, setCicdCode] = useState("");

  const getSeverityOrder = (severity: string) => {
    switch (severity) {
      case "critical":
        return 0;
      case "high":
        return 1;
      case "medium":
        return 2;
      case "low":
        return 3;
      default:
        return 4;
    }
  };

  const handleAnalyze = async (
    code: string,
    model: string,
    language: string
  ) => {
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
      const mockFindings: Vulnerability[] = mockReport.vulnerabilities.sort(
        (a, b) => getSeverityOrder(a.severity) - getSeverityOrder(b.severity)
      );
      await new Promise((f) => setTimeout(f, 2000));
      setFindings(mockFindings);
      toast({
        title: "Analysis Complete",
        description: `Your smart contract has been analyzed successfully`,
      });
    } else {
      try {
        const result = await callAuditApi(code, model, language);
        const sorted = result.vulnerabilities.sort(
          (a, b) => getSeverityOrder(a.severity) - getSeverityOrder(b.severity)
        );
        setFindings(sorted);
        toast({
          title: "Analysis Complete",
          description: `Your smart contract has been analyzed successfully`,
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "Error",
          description: "Audit agent call failed",
          variant: "destructive",
        });
        setFindings([]);
      }
    }

    setAnalysisTime((Date.now() - startTime) / 1000);
    setAnalysisStatus("complete");
    setShowingPrevious(false);
    setShowLoadingAnimation(false);
  };

  const handleFix = async (
    code: string,
    model: string,
    language: string
  ): Promise<string> => {
    if (!code?.trim()) {
      toast({
        title: "Error",
        description:
          "Please analyze a contract code first to get suggestions for fixes",
        variant: "destructive",
      });
      return "";
    }

    if (findings.length <= 0) {
      toast({
        title: "Error",
        description:
          "Audit report must contain any vulnerabilities to fix them",
        variant: "destructive",
      });
      return "";
    }

    console.log("fixing...");
    setShowLoadingAnimation(true);
    setIsFixing(true);
    const startTime = Date.now();

    if (MOCK) {
      await new Promise((f) => setTimeout(f, 2000));
      toast({
        title: "Fix Complete",
        description: `Your smart contract has been fixed successfully`,
      });
      return "Fixed";
    } else {
      try {
        const result = await callFixApi(code, model, language, findings);
        console.log(result);
        toast({
          title: "Fix Complete",
          description: `Your smart contract code has been updated`,
        });
        console.log("Fix time", (Date.now() - startTime) / 1000);
        setIsFixing(false);
        setShowLoadingAnimation(false);
        return result;
      } catch (e) {
        console.log(e);
        console.log("Fix time", (Date.now() - startTime) / 1000);
        setIsFixing(false);
        setShowLoadingAnimation(false);
        toast({
          title: "Error",
          description: "Agent call failed",
          variant: "destructive",
        });
        return "";
      }
    }
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
    toast({
      title: "Coming Soon",
      description: "Rewards functionality - coming soon.",
    });
  };

  const handleTriggerCICD = (code: string) => {
    if (!code.trim()) {
      toast({
        title: "Empty contract code",
        description: "Text box contains no contract code",
        variant: "destructive",
      });
      return;
    }
    setCicdCode(code);
    setActiveTab("cicd");
  };

  return (
    <div className="min-h-screen" id="main-page">
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="audit">Audit</TabsTrigger>
              <TabsTrigger value="cicd" disabled={!cicdCode}>
                CI/CD
              </TabsTrigger>
            </TabsList>

            <TabsContent value="audit">
              <ContractInput
                onAnalyze={handleAnalyze}
                onFix={handleFix}
                onTriggerCICD={handleTriggerCICD}
                currentStatus={analysisStatus}
                showLoadingAnimation={showLoadingAnimation}
                isFixing={isFixing}
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
            </TabsContent>

            <TabsContent value="cicd">
              <CICD code={cicdCode} />
            </TabsContent>
          </Tabs>

          <FAQ />
          <Stats />

          <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8"></div>
            <footer className="text-center text-sm text-white/60 font-orbitron">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </footer>
          </div>
        </main>
      </div>
      <ThemeToggle />
      <AIChat />
    </div>
  );
}

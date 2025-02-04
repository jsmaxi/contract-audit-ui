"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Send,
  ChevronDown,
  ChevronUp,
  FileJson,
  FileText,
  Mail,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { downloadJSON } from "@/lib/json";

export interface Finding {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  description: string;
  impactedCode: string;
  proof: string;
  recommendations: string[];
}

interface FindingsReportProps {
  findings: Finding[];
  analysisTime: number;
  //   onSendReward?: () => void;
}

const Report = ({ findings, analysisTime }: FindingsReportProps) => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [expandedFinding, setExpandedFinding] = React.useState<string | null>(
    null
  );

  const severityCounts = {
    Critical: findings.filter((f) => f.severity === "Critical").length,
    High: findings.filter((f) => f.severity === "High").length,
    Medium: findings.filter((f) => f.severity === "Medium").length,
    Low: findings.filter((f) => f.severity === "Low").length,
  };

  const outputCharacters = findings.reduce((total, finding) => {
    return (
      total +
      finding.title.length +
      finding.description.length +
      finding.impactedCode.length +
      finding.proof.length +
      finding.recommendations.join("").length
    );
  }, 0);

  const getSeverityColor = (severity: Finding["severity"]) => {
    switch (severity) {
      case "Critical":
        return "text-red-500";
      case "High":
        return "text-orange-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const handleDownloadJSON = () => {
    const report = {
      findings,
      summary: severityCounts,
      analysisTime,
      generatedAt: new Date().toISOString(),
    };
    try {
      downloadJSON(report, "smart-contract-audit-report.json");
      toast({
        title: "JSON Report Downloaded",
        description: "Audit report has been downloaded successfully.",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "JSON Report Download Failed",
        description: "Download of audit report failed.",
      });
    }
  };

  const handleDownloadPDF = () => {
    if (!reportRef.current) return;

    // todo pdf export
  };

  const handleEmailReport = () => {
    // todo email
    toast({
      title: "Report Sent",
      description: `Audit report has been sent to ${email}`,
    });
  };

  const onSendReward = () => {
    // todo
    toast({
      title: "Reward Sent",
      description: `Reward`,
    });
  };

  return (
    <Card
      className="p-6 bg-glass-card backdrop-blur-sm border-none"
      ref={reportRef}
    >
      <div className="mb-6">
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This vulnerability report is generated
            through automated analysis and may contain false positives or miss
            certain issues. Always perform your own thorough validation and
            security assessment before deploying any smart contract to
            production.
          </p>
        </div>
        <h2 className="text-2xl font-orbitron font-bold text-white mb-4">
          Audit Report Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-red-500 text-xl font-bold">
              {severityCounts.Critical}
            </p>
            <p className="text-sm text-gray-400">Critical</p>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-orange-500 text-xl font-bold">
              {severityCounts.High}
            </p>
            <p className="text-sm text-gray-400">High</p>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-yellow-500 text-xl font-bold">
              {severityCounts.Medium}
            </p>
            <p className="text-sm text-gray-400">Medium</p>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-blue-500 text-xl font-bold">
              {severityCounts.Low}
            </p>
            <p className="text-sm text-gray-400">Low</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-400">
            Analysis completed in {analysisTime} seconds
          </p>
          <p className="text-gray-400">Output characters: {outputCharacters}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {findings.map((finding) => (
              <React.Fragment key={finding.id}>
                <TableRow
                  className="cursor-pointer hover:bg-background/50"
                  onClick={() =>
                    setExpandedFinding(
                      expandedFinding === finding.id ? null : finding.id
                    )
                  }
                >
                  <TableCell
                    className={`font-bold ${getSeverityColor(
                      finding.severity
                    )}`}
                  >
                    {finding.severity}
                  </TableCell>
                  <TableCell className="font-medium">{finding.title}</TableCell>
                  <TableCell className="max-w-md">
                    {finding.description}
                  </TableCell>
                  <TableCell>
                    {expandedFinding === finding.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </TableCell>
                </TableRow>
                {expandedFinding === finding.id && (
                  <TableRow>
                    <TableCell colSpan={4} className="bg-background/30 p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold mb-2">Impacted Code:</h4>
                          <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto">
                            <code>{finding.impactedCode}</code>
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Proof:</h4>
                          <p className="text-sm">{finding.proof}</p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Recommendations:</h4>
                          <ul className="list-disc list-inside">
                            {finding.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm">
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          onClick={handleDownloadJSON}
          variant="outline"
          className="gap-2"
        >
          <FileJson className="w-4 h-4" />
          Download JSON
        </Button>
        <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
          <FileText className="w-4 h-4" />
          Download PDF
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Mail className="w-4 h-4" />
              Email Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Audit Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleEmailReport} className="w-full">
                Send Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={onSendReward}
          variant="secondary"
          className="gap-2 ml-auto"
        >
          <Send className="w-4 h-4" />
          Send Reward
        </Button>
      </div>
    </Card>
  );
};

export default Report;

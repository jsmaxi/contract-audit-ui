import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Report from "./Report";
import { Vulnerability } from "@/lib/models";
import { callHistoryApi } from "@/lib/api";

const History = () => {
  const [reportId, setReportId] = useState("");
  const [findings, setFindings] = useState<Vulnerability[]>([]);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!reportId.trim()) {
      toast({
        title: "Error",
        description: "Please enter an audit report ID",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsQuerying(true);

      console.log("history", reportId);
      const r = await callHistoryApi(reportId);
      console.log(r);

      if (r.length > 0) {
        setFindings(r);
        toast({
          title: "Report Found",
          description: "Successfully retrieved historical audit report",
        });
      } else {
        setFindings([]);
        toast({
          title: "No vulnerabilities found",
          description: "No audit vulnerabilities found with this ID",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Report history call failed",
        variant: "destructive",
      });
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <Card className="p-6 bg-glass-card backdrop-blur-sm border-none">
      <h2 className="text-2xl font-orbitron font-bold text-white mb-6">
        Audit History
      </h2>
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Enter audit report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} className="gap-2" disabled={isQuerying}>
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>

      {findings && findings.length > 0 && (
        <Report
          findings={findings}
          analysisTime={Date.now()}
          isHistory={true}
          onSendReward={() => {}}
        />
      )}
    </Card>
  );
};

export default History;

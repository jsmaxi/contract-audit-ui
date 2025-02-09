"use client";

import { Card } from "@/components/ui/card";
import { Check, List, Server } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

interface CICDProps {
  code: string;
}

const CICD = ({ code }: CICDProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!code) return;

    const steps = [
      { delay: 2000, step: 1 }, // Auditing
      { delay: 4000, step: 2 }, // Compiling
      { delay: 6000, step: 3 }, // Deploying
    ];

    steps.forEach(({ delay, step }) => {
      setTimeout(() => setCurrentStep(step), delay);
    });
  }, [code]);

  const getStepIcon = (step: number) => {
    if (currentStep > step) return <Check className="w-5 h-5 text-green-500" />;

    if (currentStep === step)
      return <List className="w-5 h-5 text-yellow-500 animate-pulse" />;

    return <List className="w-5 h-5 text-gray-400" />;
  };

  const steps = [
    { name: "Auditing", description: "Analyzing contract with AI..." },
    { name: "Compiling", description: "Building contract bytecode..." },
    { name: "Deploying", description: "Publishing to blockchain..." },
  ];

  return (
    <Card className="p-6 bg-glass-card backdrop-blur-sm border-none">
      <div className="flex items-center gap-2">
        <Server className="w-5 h-5 text-secondary mb-5" />
        <h2 className="text-xl font-bold mb-6 text-white">
          Contract CI/CD Pipeline [DEMO]
        </h2>
      </div>

      <Textarea
        value={code}
        placeholder=""
        className="h-[100px] bg-background/50 mb-4"
        disabled={true}
      />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-start gap-4">
            <div className="mt-1">{getStepIcon(index)}</div>
            <div>
              <h3 className="font-semibold text-white">{step.name}</h3>
              <p className="text-sm text-white/60">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CICD;

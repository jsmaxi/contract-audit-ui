"use client";

import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code2, Upload, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContractInput = () => {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const characterCount = code.length;

  const handleClick = () => {
    console.log("Click:", code); //todo handle
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setCode(text);
      toast({
        title: "File Loaded",
        description: `Your contract file has been loaded successfully (${text.length} characters).`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUrlFetch = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = ""; //todo url fetch
      setCode(response);
      toast({
        title: "Contract Loaded",
        description: `Contract code has been fetched from URL successfully (${response.length} characters).`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to fetch contract from URL. Please check the URL and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 bg-glass-card backdrop-blur-sm border-none">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-semibold">Smart Contract Input</h2>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2">
          <Input
            type="file"
            accept="any"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button
            className="outline flex-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <div className="flex flex-1 gap-2">
            <Input
              type="url"
              placeholder="Enter contract URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button className="outline" onClick={handleUrlFetch}>
              <Link className="w-4 h-4 mr-2" />
              Fetch
            </Button>
          </div>
        </div>

        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your contract code here..."
          className="min-h-[200px] bg-background/50"
        />

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Input characters: {characterCount}
          </div>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4O (Best results)</SelectItem>
              <SelectItem value="gpt-4o-mini">GPT-4O Mini (Faster)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
      >
        Analyze Contract
      </Button>
    </Card>
  );
};

export default ContractInput;

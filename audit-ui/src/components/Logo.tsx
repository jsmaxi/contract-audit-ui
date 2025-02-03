import React from "react";
import { Code } from "lucide-react";

const Logo = () => {
  return (
    <div className="relative w-12 h-12">
      <Code className="w-full h-full text-accent animate-pulse" />
    </div>
  );
};

export default Logo;

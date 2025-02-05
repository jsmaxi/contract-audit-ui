import { Bug } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative w-32 h-32">
        <div className="absolute animate-[bug-move_4s_linear_infinite]">
          <Bug className="w-8 h-8 text-accent animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

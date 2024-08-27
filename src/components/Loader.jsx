import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col">
      <Loader2 className="h-10 w-10 animate-spin self-center" />
    </div>
  );
};

export default Loader;

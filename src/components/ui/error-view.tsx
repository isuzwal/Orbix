import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void; 
}

const Error: React.FC<ErrorProps> = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center p-6 text-red-600">
      <AlertTriangle size={40} className="mb-2" />
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;

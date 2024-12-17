import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;

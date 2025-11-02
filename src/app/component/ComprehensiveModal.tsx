"use client";
import React from "react";

interface ComprehensiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  comprehension: string;
}

const ComprehensiveModal: React.FC<ComprehensiveModalProps> = ({
  isOpen,
  onClose,
  comprehension,
}) => {
  const displayParagraph =
    comprehension || "No comprehensive paragraph available for this question.";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[585px] max-h-[85vh] overflow-y-auto p-4 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Comprehensive Paragraph
        </h2>
        <div className="border-b border-gray-300 mb-4" />
        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
          {displayParagraph}
        </p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-[#163445] text-white px-4 py-2 rounded-md hover:bg-[#0d2c3d] transition"
          >
            Minimize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveModal;

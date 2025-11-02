"use client";
import React from "react";
import Image from "next/image";
import Timer from "@/../public/Timer.png";

interface SubmitTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  remainingTime: string;
  totalQuestions: number;
  answered: number;
  marked: number;
}

const SubmitTestModal: React.FC<SubmitTestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  remainingTime,
  totalQuestions,
  answered,
  marked,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[280px] rounded-2xl shadow-lg p-5 flex flex-col">
        <h2 className="text-[15px] font-semibold text-[#1C3141] text-center mb-5">
          Are you sure you want to submit the test?
        </h2>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
            <div className="flex items-center gap-2">
              <Image src={Timer} alt="Timer" width={16} height={16} />
              <span>Remaining Time:</span>
            </div>
            <span className="font-semibold">{remainingTime}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
            <div className="flex items-center gap-2">
              <span className="bg-[#FACC15] w-3 h-3 rounded"></span>
              <span>Total Questions:</span>
            </div>
            <span className="font-semibold">{totalQuestions}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
            <div className="flex items-center gap-2">
              <span className="bg-[#22C55E] w-3 h-3 rounded"></span>
              <span>Questions Answered:</span>
            </div>
            <span className="font-semibold">
              {answered.toString().padStart(3, "0")}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
            <div className="flex items-center gap-2">
              <span className="bg-[#A855F7] w-3 h-3 rounded"></span>
              <span>Marked for review:</span>
            </div>
            <span className="font-semibold">
              {marked.toString().padStart(3, "0")}
            </span>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-[#163445] text-white font-semibold text-sm py-2 rounded-md hover:bg-[#0f2836] transition"
        >
          Submit Test
        </button>

        <button
          onClick={onClose}
          className="text-xs text-gray-500 mt-3 underline hover:text-gray-700 transition text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubmitTestModal;

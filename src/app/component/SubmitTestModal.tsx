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
      <div className="bg-white w-[279px] h-[303px] rounded-xl shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h2
            className="text-[15px] font-semibold text-[background: rgba(28, 49, 65, 1);
] text-center mb-4"
          >
            Are you sure you want to submit the test?
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
              <div className="flex items-center gap-2">
                <Image src={Timer} alt="Timer" width={16} height={16} />
                Remaining Time:
              </div>
              <span className="font-semibold">{remainingTime}</span>
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 w-3 h-3 rounded"></span>
                Total Questions:
              </div>
              <span className="font-semibold">{totalQuestions}</span>
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
              <div className="flex items-center gap-2">
                <span className="bg-green-500 w-3 h-3 rounded"></span>
                Questions Answered:
              </div>
              <span className="font-semibold">
                {answered.toString().padStart(3, "0")}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-[#1C2B3A]">
              <div className="flex items-center gap-2">
                <span className="bg-purple-600 w-3 h-3 rounded"></span>
                Marked for review:
              </div>
              <span className="font-semibold">
                {marked.toString().padStart(3, "0")}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-[#163445] text-white font-semibold text-sm py-2 rounded-md mt-6 hover:bg-[#0f2836] transition"
        >
          Submit Test
        </button>

        <button
          onClick={onClose}
          className="text-xs text-gray-500 mt-2 underline hover:text-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubmitTestModal;

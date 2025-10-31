"use client";
import Header from "@/app/component/Header";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import questionImg from "@/assets/QuestionsVector.png";

const ExamInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(87 * 60 + 13); // 87 minutes 13 seconds in seconds
  const [questionStatuses, setQuestionStatuses] = useState<
    Record<number, "not-attended" | "attended" | "marked" | "answered-marked">
  >({
    1: "attended",
    2: "attended",
    3: "attended",
    4: "attended",
    5: "not-attended",
    6: "marked",
  });

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle exam timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestion]: "attended",
    }));
  };

  const handleMarkForReview = () => {
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestion]: selectedAnswer ? "answered-marked" : "marked",
    }));
  };

  const handleNext = () => {
    if (currentQuestion < 100) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attended":
        return "bg-[#4CAF50]";
      case "not-attended":
        return "bg-[#E14E4E]";
      case "marked":
        return "bg-[#7E1FA4]";
      case "answered-marked":
        return "bg-[#808080]";
      default:
        return "bg-[#D6E2E8] text-[#1C2B3A]";
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col">
      <Header />

      <div className="flex flex-col items-center py-6 text-center mt-[7rem] px-4 w-full">
        {/* Body */}
        <div className="w-[98%] max-w-[1279px] flex flex-col lg:flex-row gap-7">
          {/* Left Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[#1C2B3A] font-semibold text-lg">
                Ancient Indian History MCQ
              </h1>
              <p className="text-sm font-medium text-[#1C2B3A]">
                {currentQuestion.toString().padStart(2, "0")}/100
              </p>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-6">
                <button className="bg-[#0D7AA8] text-white px-4 py-2 rounded text-sm hover:bg-[#0a5a7a] transition">
                  Read Comprehensive Paragraph
                </button>
              </div>

              {/* Question Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1C2B3A] mb-3">
                  Question
                </h3>
                <p className="text-[#1C2B3A] text-base font-medium mb-4">
                  {currentQuestion}. Identify the site shown in the image below,
                  which is one of the major urban centers of the Indus Valley
                  Civilization.
                </p>
                <Image
                  src={questionImg}
                  alt="Question Image"
                  className="rounded-md w-full h-auto object-cover max-h-32"
                />
              </div>
            </div>
            {/* Options Section */}
            <div className="mt-4">
              <p
                className="text-sm font-medium text-gray-700 mb-3"
                style={{
                  fontFamily: "Manrope",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Choose the answer:
              </p>
              <div className="space-y-3">
                {["Pataliputra", "Harappa", "Mohenjo-Daro", "Lothal"].map(
                  (option, i) => (
                    <label
                      key={i}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer transition-all bg-white ${
                        selectedAnswer === option
                          ? "border-[#0D7AA8]"
                          : "border-[#D6E2E8] hover:border-[#0D7AA8]"
                      }`}
                      style={{ borderWidth: "1px" }}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <span className="text-[#1C2B3A] font-medium">
                        {String.fromCharCode(65 + i)}. {option}
                      </span>
                      <input
                        type="radio"
                        name="answer"
                        checked={selectedAnswer === option}
                        onChange={() => handleAnswerSelect(option)}
                        className="accent-[#0D7AA8] w-4 h-4"
                      />
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleMarkForReview}
                className="flex-1 bg-[#7E1FA4] text-white py-3 rounded-md font-medium hover:bg-[#5e1a7a] transition"
              >
                Mark for Review
              </button>
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 1}
                className="flex-1 bg-[#D6E2E8] text-[#1C2B3A] py-3 rounded-md font-medium hover:bg-[#c0d4dd] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === 100}
                className="flex-1 bg-[#163445] text-white py-3 rounded-md font-medium hover:bg-[#0d2c3d] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[35%] rounded-lg shadow-sm ">
            <div className="flex justify-between items-center mb-4">
              <p
                className="font-medium text-[#1C2B3A]"
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "144%",
                  letterSpacing: "0%",
                  width: "153px",
                  height: "23px",
                }}
              >
                Question No. Sheet:
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-[#1C2B3A]">Remaining Time:</p>
                <span>🕒</span>
                <span className="bg-[#0D7AA8] text-white px-3 py-1 rounded-md text-sm font-mono">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            {/* Question Grid */}
            <div className="grid grid-cols-10 gap-2 text-sm font-medium mb-4">
              {[...Array(100)].map((_, i) => {
                const questionNumber = i + 1;
                const status =
                  questionStatuses[questionNumber] || "not-attended";
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentQuestion(questionNumber);
                      setSelectedAnswer(null);
                    }}
                    className={`w-7 h-7 flex items-center justify-center rounded-md text-white text-xs font-bold transition-all hover:scale-110 ${
                      questionNumber === currentQuestion
                        ? "ring-2 ring-[#0D7AA8] ring-offset-1"
                        : ""
                    } ${getStatusColor(status)}`}
                  >
                    {questionNumber}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs font-medium text-[#1C2B3A]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#4CAF50] rounded-sm"></span>{" "}
                Attended
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#E14E4E] rounded-sm"></span> Not
                Attended
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#7E1FA4] rounded-sm"></span> Marked
                For Review
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#808080] rounded-sm"></span>{" "}
                Answered & Marked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;

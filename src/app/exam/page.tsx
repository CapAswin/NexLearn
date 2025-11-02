"use client";
import Header from "@/app/component/Header";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { listQuestions, ListQuestionsResponse, Question } from "@/api/exam";

const ExamInterface = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState<
    Record<
      number,
      "not-attended" | "attended" | "marked" | "answered-marked" | "visited"
    >
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [examData, setExamData] = useState<ListQuestionsResponse | null>(null);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Check if token exists before making API call
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response: ListQuestionsResponse = await listQuestions();
        setExamData(response);
        if (response.success) {
          setQuestions(response.questions);
          setTimeLeft(response.total_time * 60); // Convert minutes to seconds
          // Initialize question statuses
          const initialStatuses: Record<
            number,
            | "not-attended"
            | "attended"
            | "marked"
            | "answered-marked"
            | "visited"
          > = {};
          response.questions.forEach((_, index) => {
            initialStatuses[index] = "not-attended";
          });
          setQuestionStatuses(initialStatuses);
        } else {
          setError("Failed to load questions");
        }
      } catch {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
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
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionId: number) => {
    setSelectedAnswer(optionId);
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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attended":
        return "bg-[#4CAF50] text-white";
      case "not-attended":
        return "bg-white text-[#1C2B3A] border border-[#CECECE]";
      case "visited":
        return "bg-[#EE3535] text-white";
      case "marked":
        return "bg-[#7E1FA4] text-white";
      case "answered-marked":
        return "bg-[#808080] text-white";
      default:
        return "bg-[#D6E2E8] text-[#1C2B3A]";
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center py-6 text-center px-2 w-full flex-1">
        {/* Body */}
        <div className="w-full flex flex-col lg:flex-row gap-7">
          {/* Left Section */}
          <div className={error ? "min-w-[800px]" : ""}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[#1C2B3A] font-semibold text-lg">
                {examData?.instruction || "Exam"}
              </h1>
              <p className="text-sm font-medium text-[#1C2B3A]">
                {(currentQuestion + 1).toString().padStart(2, "0")}/
                {questions.length}
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
                  {currentQuestion + 1}.{" "}
                  {questions[currentQuestion]?.question_text ||
                    "Loading question..."}
                </p>
                {/* Render tags if present */}
                {questions[currentQuestion]?.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {questions[currentQuestion]!.tags!.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#EEF2FF] text-[#1C2B3A] px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Assuming no image for now, remove Image component */}
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
                  width: "132px",
                  height: "10px",
                  verticalAlign: "middle",
                }}
              >
                Choose the answer:
              </p>
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, i) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer transition-all bg-white ${
                      selectedAnswer === option.id
                        ? "border-[#0D7AA8] bg-[#EAF6FB]"
                        : "border-[#D6E2E8] hover:border-[#0D7AA8]"
                    }`}
                    style={{ borderWidth: "1px" }}
                    onClick={() => handleAnswerSelect(option.id)}
                  >
                    <span className="text-[#1C2B3A] font-medium">
                      {String.fromCharCode(65 + i)}. {option.text}
                    </span>
                    <input
                      type="radio"
                      name="answer"
                      checked={selectedAnswer === option.id}
                      onChange={() => handleAnswerSelect(option.id)}
                      className="accent-[#0D7AA8] w-4 h-4"
                    />
                  </label>
                ))}
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
                disabled={currentQuestion === 0}
                className="flex-1 bg-[#D6E2E8] text-[#1C2B3A] py-3 rounded-md font-medium hover:bg-[#c0d4dd] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
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
              {questions.map((_, i) => {
                const questionNumber = i + 1;
                const status = questionStatuses[i] || "not-attended";
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentQuestion(i);
                      setSelectedAnswer(null);
                      if (
                        !questionStatuses[i] ||
                        questionStatuses[i] === "not-attended"
                      ) {
                        setQuestionStatuses((prev) => ({
                          ...prev,
                          [i]: "visited",
                        }));
                      }
                    }}
                    className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-all hover:scale-110 ${
                      i === currentQuestion
                        ? "ring-4 ring-[#800080] ring-offset-1"
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

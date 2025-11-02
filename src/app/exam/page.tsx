"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/app/component/Header";
import { useRouter } from "next/navigation";
import { listQuestions, Question } from "@/api/exam";

type RawOption = {
  id: number;
  option?: string;
  option_text?: string;
  image?: string | null;
};

type RawQuestion = {
  question_id?: number;
  id?: number;
  number?: number;
  question?: string;
  question_text?: string;
  options?: RawOption[];
  tags?: string[];
  comprehension?: string | null;
  image?: string | null;
};

type LocalQuestion = Question & {
  number?: number;
  comprehension?: string | null;
  image?: string | null;
  tags?: string[];
};

const ExamInterface = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<LocalQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState<
    Record<
      number,
      "not-attended" | "attended" | "marked" | "answered-marked" | "visited"
    >
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await listQuestions();

        if (response?.success && response.questions?.length) {
          const mappedQuestions = response.questions.map(
            (q: RawQuestion, idx: number) => ({
              id: q.question_id ?? q.id ?? idx,
              number: q.number ?? idx + 1,
              question_text: q.question ?? q.question_text ?? "",
              options: (q.options || []).map((opt: RawOption) => ({
                id: opt.id,
                text: opt.option ?? opt.option_text ?? "",
              })),
              tags: q.tags,
              comprehension: q.comprehension,
              image: q.image,
            })
          );

          setQuestions(mappedQuestions as Question[]);

          // Check if exam has already started (time stored in localStorage)
          const storedTime = localStorage.getItem("exam_time_left");
          const examStartTime = localStorage.getItem("exam_start_time");

          if (storedTime && examStartTime) {
            const elapsed = Math.floor(
              (Date.now() - parseInt(examStartTime)) / 1000
            );
            const remainingTime = Math.max(0, parseInt(storedTime) - elapsed);
            setTimeLeft(remainingTime);
            setExamStarted(true);
          } else {
            // First time starting exam
            const totalTime = (response.total_time || 0) * 60;
            setTimeLeft(totalTime);
          }

          // Load saved answers and statuses from localStorage
          const savedAnswers = localStorage.getItem("exam_answers");
          const savedStatuses = localStorage.getItem("exam_statuses");

          if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
          } else {
            const initialAnswers: Record<number, number | null> = {};
            mappedQuestions.forEach((_, idx) => {
              initialAnswers[idx] = null;
            });
            setAnswers(initialAnswers);
          }

          if (savedStatuses) {
            setQuestionStatuses(JSON.parse(savedStatuses));
          } else {
            const initialStatuses: Record<
              number,
              "not-attended" | "attended" | "marked" | "answered-marked"
            > = Object.fromEntries(
              mappedQuestions.map((_, index) => [index, "not-attended"])
            );
            setQuestionStatuses(initialStatuses);
          }
        } else {
          setError("Failed to load questions");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [router]);

  // Save answers and statuses to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("exam_answers", JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    if (Object.keys(questionStatuses).length > 0) {
      localStorage.setItem("exam_statuses", JSON.stringify(questionStatuses));
    }
  }, [questionStatuses]);

  // Timer effect with high accuracy
  useEffect(() => {
    if (timeLeft > 0 && examStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Handle exam timeout - auto submit
            handleSubmitExam();
            return 0;
          }
          // Save current time to localStorage
          localStorage.setItem("exam_time_left", newTime.toString());
          return newTime;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [timeLeft, examStarted]);

  // Prevent page reload/refresh and back button
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (examStarted) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your exam progress will be lost.";
        return e.returnValue;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        examStarted &&
        (e.ctrlKey || e.metaKey) &&
        (e.key === "r" || e.key === "R")
      ) {
        e.preventDefault();
        alert("Page refresh is not allowed during the exam.");
      }
      // Prevent F5 refresh
      if (examStarted && e.key === "F5") {
        e.preventDefault();
        alert("Page refresh is not allowed during the exam.");
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (examStarted) {
        e.preventDefault();
        window.history.pushState(null, "", window.location.href);
        alert("Going back is not allowed during the exam.");
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (examStarted) {
        e.preventDefault();
        alert("Right-click is disabled during the exam.");
      }
    };

    if (examStarted) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("contextmenu", handleContextMenu);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [examStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    localStorage.setItem("exam_start_time", Date.now().toString());
    localStorage.setItem("exam_time_left", timeLeft.toString());
  };

  const handleAnswerSelect = (optionId: number) => {
    if (!examStarted) return;
    setSelectedAnswer(optionId);
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionId }));
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestion]: "attended",
    }));
  };

  const handleMarkForReview = () => {
    if (!examStarted) return;
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestion]: selectedAnswer ? "answered-marked" : "marked",
    }));
  };

  const handleNext = () => {
    if (!examStarted) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => {
        const next = prev + 1;
        setSelectedAnswer(answers[next] ?? null);
        return next;
      });
    }
  };

  const handlePrevious = () => {
    if (!examStarted) return;
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => {
        const prevIdx = prev - 1;
        setSelectedAnswer(answers[prevIdx] ?? null);
        return prevIdx;
      });
    }
  };

  const handleSubmitExam = async () => {
    try {
      // Clear exam data from localStorage
      localStorage.removeItem("exam_time_left");
      localStorage.removeItem("exam_start_time");
      localStorage.removeItem("exam_answers");
      localStorage.removeItem("exam_statuses");

      // Navigate to results page
      router.push("/result");
    } catch (error) {
      console.error("Error submitting exam:", error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#1C2B3A]">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center py-6 text-center px-2 w-full flex-1 mt-20">
        {/* Body */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-7 min-h-[600px]">
          {/* Left Section */}
          <div className="flex-1 min-w-[600px] lg:min-w-[700px]">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[#1C2B3A] font-semibold text-lg">Exam</h1>
              <p className="text-sm font-medium text-[#1C2B3A]">
                {(questions[currentQuestion]?.number ?? currentQuestion + 1)
                  .toString()
                  .padStart(2, "0")}
                /{questions.length}
              </p>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm p-5 min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <button className="bg-[#0D7AA8] text-white px-4 py-2 rounded text-sm hover:bg-[#0a5a7a] transition">
                  Read Comprehensive Paragraph
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1C2B3A] mb-3">
                  Question
                </h3>
                <p className="text-[#1C2B3A] text-base font-medium mb-4">
                  {currentQuestion + 1}.{" "}
                  {questions[currentQuestion]?.question_text ||
                    "Loading question..."}
                </p>
                {questions[currentQuestion]?.comprehension && (
                  <div className="mb-4 text-sm text-gray-700">
                    <strong>Comprehension:</strong>
                    <p className="mt-2">
                      {questions[currentQuestion]?.comprehension}
                    </p>
                  </div>
                )}

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
              </div>
            </div>

            {!examStarted && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium mb-2">
                  Ready to start the exam?
                </p>
                <p className="text-yellow-700 text-sm mb-4">
                  Once you start, the timer will begin and you won&apos;t be
                  able to refresh the page.
                </p>

                <button
                  onClick={handleStartExam}
                  className="bg-[#0D7AA8] text-white px-6 py-2 rounded-md hover:bg-[#0a5a7a] transition"
                >
                  Start Exam
                </button>
              </div>
            )}

            {examStarted && (
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
                        (answers[currentQuestion] ?? selectedAnswer) ===
                        option.id
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
                        name={`answer-${currentQuestion}`}
                        checked={
                          (answers[currentQuestion] ?? selectedAnswer) ===
                          option.id
                        }
                        onChange={() => handleAnswerSelect(option.id)}
                        className="accent-[#0D7AA8] w-4 h-4"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Buttons */}
            {examStarted && (
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
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition"
                >
                  Submit Exam
                </button>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[35%] min-w-[300px] lg:min-w-[350px] rounded-lg shadow-sm">
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
                      if (!examStarted) return;
                      setCurrentQuestion(i);
                      setSelectedAnswer(answers[i] ?? null);
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
                    disabled={!examStarted}
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

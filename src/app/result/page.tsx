"use client";

import Header from "@/app/component/Header";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import questionsVector from "@/assets/QuestionsVector.png";
import correctAnswerIcon from "@/assets/correct-answer.png";
import wrongAnswerIcon from "@/assets/wrong-answe.png";
import { getExamResults } from "@/api/exam";
import { useToast } from "@/context/ToastContext";

interface ExamResults {
  score: number;
  total_questions: number;
  correct: number;
  wrong: number;
}

interface ExamResultsResponse {
  success: boolean;
  results?: ExamResults;
  message?: string;
}

interface ResultRowProps {
  color: string;
  icon: StaticImageData;
  label: string;
  value: number;
}

const ResultRow = ({ color, icon, label, value }: ResultRowProps) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div
        className="w-[36px] h-[36px] rounded-md flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Image
          src={icon}
          alt={label}
          width={14}
          height={14}
          className="object-contain"
        />
      </div>
      <p className="text-[18px] leading-none text-[#1C2B3A]">{label}</p>
    </div>
    <span className="text-[18px] leading-none text-[#1C2B3A] font-semibold">
      {value}
    </span>
  </div>
);

const ResultPage = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [result, setResult] = useState<ExamResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getExamResults();

        // Defensive type-checking
        const data = response as Partial<ExamResultsResponse>;

        if (data?.success && data.results) {
          setResult(data.results);
          addToast("Results loaded successfully!", "success");
        } else {
          setError(data?.message || "Failed to load results");
          addToast(data?.message || "Failed to load results", "error");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results. Please check authentication.");
        addToast(
          "Failed to load results. Please check authentication.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [addToast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
        <Header />
        <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
          <div className="text-lg">Loading results...</div>
        </main>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
        <Header />
        <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
          <div className="text-red-500 text-lg">
            {error || "No results found"}
          </div>
        </main>
      </div>
    );
  }

  const notAttended = result.total_questions - (result.correct + result.wrong);

  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
      <Header />

      <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
        {/* Marks Box */}
        <div className="bg-gradient-to-r from-[#0d7aa8] to-[#163445] rounded-[17.64px] shadow-md text-white w-[429px] h-[150px] flex flex-col items-center justify-center text-center">
          <p className="font-medium text-[18.81px] mb-2">Marks Obtained:</p>
          <h1 className="font-medium text-[68px] leading-none">
            {result.score} / {result.total_questions * 10}
          </h1>
        </div>

        {/* Details Section */}
        <div className="w-[429px] mt-8 space-y-3 text-gray-700 text-sm">
          <ResultRow
            color="#DDA428"
            icon={questionsVector}
            label="Total Questions:"
            value={result.total_questions}
          />
          <ResultRow
            color="#4caf50"
            icon={correctAnswerIcon}
            label="Correct Answers:"
            value={result.correct}
          />
          <ResultRow
            color="#e14e4e"
            icon={wrongAnswerIcon}
            label="Incorrect Answers:"
            value={result.wrong}
          />
          <ResultRow
            color="#808080"
            icon={questionsVector}
            label="Not Attended Questions:"
            value={notAttended}
          />
        </div>

        {/* Done Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 bg-[#163445] text-white w-[429px] h-[48px] rounded-[10px] hover:bg-[#0d2c3d] transition"
        >
          Done
        </button>
      </main>
    </div>
  );
};

export default ResultPage;

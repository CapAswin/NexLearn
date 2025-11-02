"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/component/Header";
import TagPill from "@/app/component/TagPill";
import { listQuestions, ListQuestionsResponse } from "@/api/exam";

const Instructions = () => {
  const router = useRouter();
  const [examData, setExamData] = useState<ListQuestionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response: ListQuestionsResponse = await listQuestions();
        if (response.success) {
          setExamData(response);
        } else {
          setError("Failed to load exam data");
        }
      } catch {
        setError("Failed to load exam data");
      } finally {
        setLoading(false);
      }
    };
    fetchExamData();
  }, [router]);

  const instructionHTML = examData?.instruction
    ?.replace(/<ol>/g, "<ol class='list-decimal pl-6 space-y-2 text-gray-700'>")
    ?.replace(/<li>/g, "<li class='leading-relaxed'>");

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
        <Header />
        <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
          <div className="text-lg">Loading exam instructions...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
        <Header />
        <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
          <div className="text-red-500 text-lg">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
        <div className="flex justify-center mb-8">
          <div className="bg-[#1c2b3a] text-white rounded-lg flex flex-wrap justify-center divide-x divide-gray-500 overflow-hidden">
            {[
              { label: "Total MCQ's", value: examData?.questions_count || 0 },
              { label: "Total marks", value: examData?.total_marks || 0 },
              { label: "Total time", value: `${examData?.total_time || 0}:00` },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-10 py-4 min-w-[100px]"
              >
                <span className="text-sm opacity-80">{item.label}:</span>
                <span className="text-3xl font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left max-w-2xl text-gray-700 text-[15px] leading-relaxed mb-">
          <p className="font-semibold mb-2">Instructions:</p>
          <div
            className="text-gray-700 leading-relaxed list-decimal space-y-2"
            dangerouslySetInnerHTML={{
              __html: instructionHTML ?? "",
            }}
          />
        </div>

        {examData?.questions && (
          <div className="w-full max-w-2xl mb-8 text-left">
            <p className="font-semibold mb-2">Topics covered:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(examData.questions.flatMap((q) => q.tags || []))
              ).map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </div>
        )}

        <button className="bg-[#1c2b3a] hover:bg-[#233b50] text-white px-8 py-3 rounded-lg text-lg font-medium transition mb-5">
          Start Test
        </button>
      </main>
    </div>
  );
};

export default Instructions;

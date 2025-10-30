"use client";
import React from "react";
import Header from "@/app/component/Header";

const Instructions = () => {
  return (
    <div className="min-h-screen bg-[#f2f8fa] flex flex-col items-center">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center text-center mt-10 px-4 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-[#1c2b3a] mb-6">
          Ancient Indian History MCQ
        </h2>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <div className="bg-[#1c2b3a] text-white rounded-md px-8 py-4 flex flex-col items-center">
            <span className="text-sm opacity-80">Total MCQs:</span>
            <span className="text-3xl font-semibold">100</span>
          </div>
          <div className="bg-[#1c2b3a] text-white rounded-md px-8 py-4 flex flex-col items-center">
            <span className="text-sm opacity-80">Total marks:</span>
            <span className="text-3xl font-semibold">100</span>
          </div>
          <div className="bg-[#1c2b3a] text-white rounded-md px-8 py-4 flex flex-col items-center">
            <span className="text-sm opacity-80">Total time:</span>
            <span className="text-3xl font-semibold">90:00</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-left max-w-2xl text-gray-700 text-[15px] leading-relaxed mb-8">
          <p className="font-semibold mb-2">Instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>You have 100 minutes to complete the test.</li>
            <li>Test consists of 100 multiple-choice questions.</li>
            <li>
              You are allowed 2 retest attempts if you do not pass on the first
              try.
            </li>
            <li>Each incorrect answer will incur a negative mark of -1/4.</li>
            <li>
              Ensure you are in a quiet environment and have a stable internet
              connection.
            </li>
            <li>
              Keep an eye on the timer, and try to answer all questions within
              the given time.
            </li>
            <li>
              Do not use any external resources such as dictionaries, websites,
              or assistance.
            </li>
            <li>
              Complete the test honestly to accurately assess your proficiency
              level.
            </li>
            <li>Check answers before submitting.</li>
            <li>
              Your test results will be displayed immediately after submission,
              indicating whether you have passed or need to retake the test.
            </li>
          </ol>
        </div>

        {/* Start Button */}
        <button className="bg-[#1c2b3a] hover:bg-[#233b50] text-white px-8 py-3 rounded-lg text-lg font-medium transition">
          Start Test
        </button>
      </main>
    </div>
  );
};

export default Instructions;

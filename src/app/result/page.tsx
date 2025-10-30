"use client";
import Header from "@/app/component/Header";

const ResultPage = () => {
  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
      <Header />

      <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
        {/* Marks Box */}
        <div className="bg-gradient-to-r from-[#0d7aa8] to-[#163445] rounded-md shadow-md text-white w-[300px] h-[100px] flex flex-col items-center justify-center">
          <p className="text-sm mb-1">Marks Obtained:</p>
          <h1 className="text-4xl font-semibold">100 / 100</h1>
        </div>

        {/* Details Section */}
        <div className="mt-8 space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-[#f5d041] w-5 h-5 rounded-sm"></span>
            <p>
              Total Questions: <span className="font-semibold">100</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#56c96f] w-5 h-5 rounded-sm"></span>
            <p>
              Correct Answers: <span className="font-semibold">003</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#e14e4e] w-5 h-5 rounded-sm"></span>
            <p>
              Incorrect Answers: <span className="font-semibold">001</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#808080] w-5 h-5 rounded-sm"></span>
            <p>
              Not Attended Questions: <span className="font-semibold">096</span>
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-8 bg-[#163445] text-white px-8 py-2 rounded-md hover:bg-[#0d2c3d] transition">
          Done
        </button>
      </main>
    </div>
  );
};

export default ResultPage;

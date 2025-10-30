"use client";
import Header from "@/app/component/Header";
import Image from "next/image";
import questionsVector from "@/assets/QuestionsVector.png";
import correctAnswerIcon from "@/assets/correct-answer.png";
import wrongAnswerIcon from "@/assets/wrong-answe.png";

const ResultPage = () => {
  return (
    <div className="min-h-screen bg-[rgba(244,252,255,1)] flex flex-col items-center">
      <Header />

      <main className="flex flex-col items-center text-center mt-[7rem] px-4 w-full max-w-3xl">
        {/* Marks Box */}
        <div className="bg-gradient-to-r from-[#0d7aa8] to-[#163445] rounded-[17.64px] shadow-md text-white w-[429px] h-[150px] flex flex-col items-center justify-center">
          <p className="text-sm mb-1">Marks Obtained:</p>
          <h1 className="text-4xl font-semibold">100 / 100</h1>
        </div>

        <div className="w-[429px]">
          {/* Details Section */}
          <div className="mt-8 space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-3">
              {/* Icon box */}
              <div className="w-[36px] h-[36px] bg-[#DDA428] rounded-md flex items-center justify-center">
                <Image
                  src={questionsVector}
                  alt="Questions Icon"
                  width={14}
                  height={14}
                  className="object-contain"
                />
              </div>

              {/* Label */}
              <p className="text-[18px] leading-none text-[#1C2B3A]">
                Total Questions: <span className="font-semibold">100</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] bg-[#4caf50] rounded-md flex items-center justify-center">
                <Image
                  src={correctAnswerIcon}
                  alt="Correct Answer Icon"
                  width={14}
                  height={14}
                  className="object-contain"
                />
              </div>
              <p className="text-[18px] leading-none text-[#1C2B3A]">
                Correct Answers: <span className="font-semibold">003</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] bg-[#e14e4e] rounded-md flex items-center justify-center">
                <Image
                  src={wrongAnswerIcon}
                  alt="Incorrect Answer Icon"
                  width={14}
                  height={14}
                  className="object-contain"
                />
              </div>
              <p className="text-[18px] leading-none text-[#1C2B3A]">
                Incorrect Answers: <span className="font-semibold">001</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] bg-[#808080] rounded-md flex items-center justify-center">
                <Image
                  src={questionsVector}
                  alt="Questions Icon"
                  width={14}
                  height={14}
                  className="object-contain"
                />
              </div>
              <p className="text-[18px] leading-none text-[#1C2B3A]">
                Not Attended Questions:{" "}
                <span className="font-semibold">096</span>
              </p>
            </div>
          </div>
          {/* Button */}
          <button className="mt-8 bg-[#163445] text-white px-8 py-2 rounded-md hover:bg-[#0d2c3d] transition">
            Done
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;

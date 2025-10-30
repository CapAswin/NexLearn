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
        <div className="bg-gradient-to-r from-[#0d7aa8] to-[#163445] rounded-[17.64px] shadow-md text-white w-[429px] h-[150px] flex flex-col items-center justify-center text-center">
          <p className="font-['Inter'] font-medium text-[18.81px] leading-none mb-2">
            Marks Obtained:
          </p>
          <h1 className="font-['Inter'] font-medium text-[68px] leading-none">
            100 / 100
          </h1>
        </div>

        <div className="w-[429px]">
          {/* Details Section */}
          <div className="mt-8 space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between items-center">
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
                  Total Questions:
                </p>
              </div>
              <span className="text-[18px] leading-none text-[#1C2B3A] font-semibold">
                100
              </span>
            </div>

            <div className="flex justify-between items-center">
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
                  Correct Answers:
                </p>
              </div>
              <span className="text-[18px] leading-none text-[#1C2B3A] font-semibold">
                003
              </span>
            </div>
            <div className="flex justify-between items-center">
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
                  Incorrect Answers:
                </p>
              </div>
              <span className="text-[18px] leading-none text-[#1C2B3A] font-semibold">
                001
              </span>
            </div>
            <div className="flex justify-between items-center">
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
                  Not Attended Questions:
                </p>
              </div>
              <span className="text-[18px] leading-none text-[#1C2B3A] font-semibold">
                096
              </span>
            </div>
          </div>
          {/* Button */}
          <button className="mt-8 bg-[#163445] text-white w-[429px] h-[48px] rounded-[10px] opacity-100 hover:bg-[#0d2c3d] transition">
            Done
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;

"use client";

const SignUpForm = () => {
  return (
    <div className="flex flex-1 flex-col bg-white text-[#1c2b3a] m-2 rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 gap-3 sm:gap-4 justify-between transition-all duration-300">
      <div>
        <h3 className="font-['Inter'] font-semibold text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl leading-tight lg:leading-[32px] xl:leading-[32px] 2xl:leading-[32px] mb-2 sm:mb-3 md:mb-4 text-[rgba(28,49,65,1)] transition-all duration-300">
          Add Your Details
        </h3>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1c2b3a] hover:bg-[#233b50] text-white font-medium rounded-lg py-1 sm:py-2 md:py-3 mt-3 sm:mt-4 md:mt-6 transition-all duration-300 text-sm sm:text-base"
      >
        Get Started
      </button>
    </div>
  );
};

export default SignUpForm;

"use client";

import MainLayout from "../component/mainLayOut";
import AuthLayout from "../component/AuthLayout";
import OtpForm from "../component/OtpForm";
import { useSearchParams } from "next/navigation";

const OtpPage = () => {
  const searchParams = useSearchParams();
  let mobile = searchParams.get("mobile") || "";
  let countryCode = searchParams.get("countryCode") || "";

  // Normalize country code to include "+" if missing
  if (countryCode && !countryCode.startsWith("+")) {
    countryCode = "+" + countryCode;
  }

  // Parse mobile number to extract country code if embedded
  mobile = mobile.trim();
  if (mobile.startsWith("91") && mobile.length > 10) {
    countryCode = "+91";
    mobile = mobile.substring(2);
  }

  return (
    <MainLayout>
      <AuthLayout>
        <OtpForm mobile={mobile} countryCode={countryCode} onBack={() => {}} />
      </AuthLayout>
    </MainLayout>
  );
};

export default OtpPage;

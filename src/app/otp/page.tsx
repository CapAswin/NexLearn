"use client";

import MainLayout from "../component/mainLayOut";
import AuthLayout from "../component/AuthLayout";
import OtpForm from "../component/OtpForm";

const OtpPage = () => {
  return (
    <MainLayout>
      <AuthLayout>
        <OtpForm mobile="1234567890" countryCode="+91" onBack={() => {}} />
      </AuthLayout>
    </MainLayout>
  );
};

export default OtpPage;

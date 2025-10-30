"use client";

import MainLayout from "../component/mainLayOut";
import AuthLayout from "../component/AuthLayout";
import SignUpForm from "../component/SignUpForm";

const SignUp = () => {
  return (
    <MainLayout>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </MainLayout>
  );
};

export default SignUp;

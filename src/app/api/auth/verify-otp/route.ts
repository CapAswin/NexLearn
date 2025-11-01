import { NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import type { AuthResponse } from "@/types/api";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const mobile = formData.get("mobile");
    const otp = formData.get("otp");

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, message: "Mobile number and OTP are required" },
        { status: 400 }
      );
    }

    // Forward the FormData directly to the backend as it expects multipart/form-data
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/verify-otp",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // If successful and tokens exist, return all data
    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    return NextResponse.json(
      {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to verify OTP. Please try again.",
      },
      { status: err.response?.status || 500 }
    );
  }
}

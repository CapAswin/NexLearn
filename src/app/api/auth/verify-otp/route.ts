import { NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";
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

    // Forward mobile and otp as JSON to backend. Preserve '+' in mobile.
    const mobileStr = String(mobile);
    const otpStr = String(otp);
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/verify-otp",
      {
        mobile: mobileStr,
        otp: otpStr,
      }
    );

    // If successful and tokens exist, return all data
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response?.data?.message ||
            "Failed to verify OTP. Please try again.",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to verify OTP. Please try again." },
      { status: 500 }
    );
  }
}

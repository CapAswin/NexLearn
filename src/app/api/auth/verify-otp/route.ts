import { NextResponse } from "next/server";
import axios from "axios";
import axiosInstance from "@/lib/axios";
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

    const backendForm = new FormData();
    backendForm.append("mobile", String(mobile));
    backendForm.append("otp", String(otp));

    const response = await axiosInstance.post<AuthResponse>(
      "/auth/verify-otp",
      backendForm,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

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

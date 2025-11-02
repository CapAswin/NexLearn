import { NextResponse } from "next/server";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import type { AuthResponse } from "@/types/api";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const mobile = formData.get("mobile");

    if (!mobile) {
      return NextResponse.json(
        { success: false, message: "Mobile number is required" },
        { status: 400 }
      );
    }

    const backendForm = new FormData();
    backendForm.append("mobile", String(mobile));

    const response = await axiosInstance.post<AuthResponse>(
      "/auth/send-otp",
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
          message: error.response?.data?.message || "Failed to send OTP",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";
import type { AuthResponse } from "@/types/api";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const mobile = formData.get("mobile");
    const name = formData.get("name");
    const email = formData.get("email");
    const qualification = formData.get("qualification");
    const profileImage = formData.get("profile_image");

    if (!mobile || !name || !email || !qualification || !profileImage) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const response = await axiosInstance.post<AuthResponse>(
      "/auth/create-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    return NextResponse.json(
      {
        success: false,
        message:
          err.response?.data?.message || "Failed to create profile. Try again.",
      },
      { status: err.response?.status || 500 }
    );
  }
}

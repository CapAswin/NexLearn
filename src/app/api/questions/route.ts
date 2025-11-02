import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import type { ListQuestionsResponse } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    // ✅ Extract token from Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "").trim()
      : null;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authorization token is missing" },
        { status: 401 }
      );
    }

    // ✅ Fetch questions from backend with proper Bearer token
    const response = await axiosInstance.get<ListQuestionsResponse>(
      "/question/list",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    // ✅ Return the backend response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    // ✅ Handle Axios-specific errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message ||
        "Failed to fetch questions. Please try again.";

      return NextResponse.json({ success: false, message }, { status });
    }

    // ✅ Handle unexpected errors
    console.error("Unexpected error in /api/question/list:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred" },
      { status: 500 }
    );
  }
}

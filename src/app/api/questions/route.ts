import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import type { ListQuestionsResponse } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await axiosInstance.get<ListQuestionsResponse>(
      "/question/list",
      {
        headers: { Authorization: authHeader },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Failed to fetch questions",
        },
        { status: error.response?.status || 500 }
      );
    }

    // Fallback for non-Axios errors
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

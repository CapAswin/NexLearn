import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import type { ListQuestionsResponse } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    // Extract token from Authorization header
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

    // Fetch questions from backend using fetch
    const backendUrl = `${axiosInstance.defaults.baseURL}/question/list`;
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          message: errorData.detail?.message || "Failed to fetch questions",
        },
        { status: response.status }
      );
    }

    const data: ListQuestionsResponse = await response.json();

    // Return the backend response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error in /api/questions:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred" },
      { status: 500 }
    );
  }
}

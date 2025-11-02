import { NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import type { SubmitAnswersResponse, AnswerSubmission } from "@/types/api";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const answersJson = formData.get("answers");

    if (!answersJson) {
      return NextResponse.json(
        { success: false, message: "Answers are required" },
        { status: 400 }
      );
    }

    const answers: AnswerSubmission[] = JSON.parse(answersJson.toString());

    const backendUrl = `${axiosInstance.defaults.baseURL}/answers/submit`;
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          message: errorData.detail?.message || "Failed to submit answers",
        },
        { status: response.status }
      );
    }

    const data: SubmitAnswersResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error in /api/answers/submit:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

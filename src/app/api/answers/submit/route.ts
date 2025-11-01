import { NextResponse } from "next/server";
import axios from "axios";
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

    const response = await axiosInstance.post<SubmitAnswersResponse>(
      "/answers/submit",
      { answers },
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
          message: error.response?.data?.message || "Failed to submit answers",
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

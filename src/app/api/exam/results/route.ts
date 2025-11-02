import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface ExamResult {
  correct: number;
  wrong: number;
  total_questions: number;
  score: number;
  percentage: number;
  status: "pass" | "fail";
}

export async function GET(request: NextRequest) {
  try {
    const mockResults: ExamResult = {
      correct: 8,
      wrong: 2,
      total_questions: 10,
      score: 80,
      percentage: 80,
      status: "pass",
    };

    return NextResponse.json({
      success: true,
      results: mockResults,
    });
  } catch (error) {
    console.error("Error fetching exam results:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

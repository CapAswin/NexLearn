import axiosInstance from "./axiosInstance";

/**
 * ---------------------------
 * Types
 * ---------------------------
 */
export interface Option {
  id: number;
  text: string;
  is_correct?: boolean;
}

export interface Question {
  id: number;
  question_text: string;
  options: Option[];
  // optional tags returned by the API (e.g. topic labels)
  tags?: string[];
}

export interface ListQuestionsResponse {
  success: boolean;
  questions_count: number;
  total_marks: number;
  total_time: number;
  time_for_each_question: number;
  mark_per_each_answer: number;
  instruction: string;
  questions: Question[];
  message?: string;
}

export interface Answer {
  question_id: number;
  selected_option_id: number | null;
}

export interface SubmitAnswersResponse {
  success: boolean;
  score: number;
  total_marks: number;
  correct_answers: number;
  wrong_answers: number;
  not_attended: number;
  message?: string;
}

export interface ExamResultResponse {
  success: boolean;
  score: number;
  total_marks: number;
  correct_answers: number;
  wrong_answers: number;
  not_attended: number;
  message?: string;
}

/**
 * ---------------------------
 * API Methods
 * ---------------------------
 */

/**
 * Fetch all exam questions with their options, timing, and marking details
 * Endpoint: GET /question/list
 * Authentication: Requires valid JWT token
 * @returns ListQuestionsResponse containing exam configuration and questions
 */
export const listQuestions = async (): Promise<ListQuestionsResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    const response = await axiosInstance.get<ListQuestionsResponse>(
      "/question/list"
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to load questions. Please try again.");
  }
};

/**
 * Submit user answers
 * Endpoint: POST /answers/submit
 */
export const submitAnswers = async (
  answers: Answer[]
): Promise<SubmitAnswersResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    const response = await axiosInstance.post<SubmitAnswersResponse>(
      "/answers/submit",
      { answers },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to submit answers");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error in submitAnswers:", error);
    throw new Error("Unable to submit answers. Please try again later.");
  }
};

/**
 * Fetch user exam results
 * Endpoint: GET /exam/results
 */
export const getExamResults = async (): Promise<ExamResultResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    const response = await axiosInstance.get<ExamResultResponse>(
      "/exam/results",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to fetch exam results");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error in getExamResults:", error);
    throw new Error("Unable to load exam results. Please try again later.");
  }
};

// ✅ Generic API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// ✅ Auth Types

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  login: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}

export interface CreateProfilePayload {
  mobile: string;
  name: string;
  email: string;
  qualification: string;
  profile_image: File;
}

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  qualification: string;
  profile_image: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProfileResponse {
  success: boolean;
  access_token: string;
  refresh_token: string;
  message: string;
  user: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ✅ Exam Types

export interface Option {
  id: number;
  option_text: string;
}

export interface Question {
  id: number;
  question_text: string;
  options: Option[];
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
}

export interface Answer {
  question_id: number;
  selected_option_id: number | null;
}

export interface QuestionDetail {
  question_id: number;
  correct_option_id: number;
  selected_option_id: number | null;
  is_correct: boolean;
}

export interface SubmitAnswersResponse {
  success: boolean;
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
  status: "pending" | "completed" | "failed";
  details: QuestionDetail[];
}

// ✅ Error Type (Optional)
export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

export interface ApiError {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  login?: boolean;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  user?: UserProfile;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  mobile: string;
  qualification: string;
  profile_image: string;
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

export interface Question {
  id: number;
  question: string;
  question_text?: string;
  options: Option[];
  tags?: string[];
}

export interface Option {
  id: number;
  option_text: string;
}

export interface AnswerSubmission {
  question_id: number;
  selected_option_id: number | null;
}

export interface SubmitAnswersResponse {
  success: boolean;
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
  details: AnswerDetail[];
}

export interface AnswerDetail {
  question_id: number;
  is_correct: boolean;
  correct_option_id: number;
  selected_option_id: number | null;
}

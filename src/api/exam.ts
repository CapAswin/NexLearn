import axiosInstance from "./axiosInstance";
import { ListQuestionsResponse, SubmitAnswersResponse, Answer } from "../types";

export const listQuestions = async (): Promise<ListQuestionsResponse> => {
  const response = await axiosInstance.get("/question/list");
  return response.data;
};

export const submitAnswers = async (
  answers: Answer[]
): Promise<SubmitAnswersResponse> => {
  const response = await axiosInstance.post("/answers/submit", { answers });
  return response.data;
};

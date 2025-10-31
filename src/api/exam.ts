import axiosInstance from "./axiosInstance";
import { Question, SubmitAnswersResponse } from "../types";

export const getExamQuestions = async (examId: string): Promise<Question[]> => {
  const response = await axiosInstance.get(`/exam/${examId}/questions`);
  return response.data;
};

export const submitExam = async (
  examId: string,
  answers: Record<string, string>
) => {
  const response = await axiosInstance.post(`/exam/${examId}/submit`, {
    answers,
  });
  return response.data;
};

export const getExamResults = async (
  examId: string
): Promise<SubmitAnswersResponse> => {
  const response = await axiosInstance.get(`/exam/${examId}/results`);
  return response.data;
};

import axiosInstance from "./axiosInstance";

// Tip 응답 인터페이스
export interface TipResponse {
  content: string;
  category: string;
  idx: string;
}

// 언어별 Tip 목록 조회 API
export const getTipsAPI = async (
  language: string
): Promise<TipResponse[] | unknown> => {
  const response = await axiosInstance.get(`/tips/${language}`);
  return response.data;
};

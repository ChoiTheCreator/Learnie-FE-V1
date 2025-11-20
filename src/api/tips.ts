import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

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
  try {
    console.log("[Tips API] 요청 시작:", {
      language,
      baseURL: axiosInstance.defaults.baseURL,
      url: `/tips/${language}`,
      fullURL: `${axiosInstance.defaults.baseURL}/tips/${language}`,
    });

    const response = await axiosInstance.get(`/tips/${language}`);

    console.log("[Tips API] 응답 성공:", {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[Tips API] 요청 실패:", {
      message: axiosError?.message,
      response: axiosError?.response?.data,
      status: axiosError?.response?.status,
      statusText: axiosError?.response?.statusText,
      config: {
        url: axiosError?.config?.url,
        baseURL: axiosError?.config?.baseURL,
        method: axiosError?.config?.method,
      },
      fullError: axiosError,
    });
    throw axiosError;
  }
};

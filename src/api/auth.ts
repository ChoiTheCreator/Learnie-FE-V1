import axiosInstance from "./axiosInstance";
import type { Language } from "../store/useLanguageStore";

// 회원가입 API
export interface SignupRequest {
  user_id: string;
  username: string;
  password: string;
  language: string;
}

export interface SignupResponse {
  success?: boolean;
  message?: string;
  language?: Language | string;
  // API 응답 형식에 따라 추가 가능
}

export const signupAPI = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>("/user/signup", data);
  return response.data;
};

// 로그인 API
export interface LoginRequest {
  user_id: string;
  password: string;
}

// 스웨거 API 문서에 따른 로그인 응답 구조
export interface LoginResponse {
  id?: number;
  userId?: string;
  username?: string;
  message?: string;
  language?: Language | string; // 백엔드에서 "JP", "KR" 등 대문자로 올 수 있음
}

export const loginAPI = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/user/login", data);
  return response.data;
};

// 로그아웃 API
export const logoutAPI = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};


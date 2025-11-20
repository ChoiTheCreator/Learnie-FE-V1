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
  const response = await axiosInstance.post<SignupResponse>("/api/users/signup", data);
  return response.data;
};

// 로그인 API
export interface LoginRequest {
  user_id: string;
  password: string;
}

export interface LoginResponse {
  name?: string;
  username?: string;
  user_id?: string;
  email?: string;
  aiTutorToken?: string;
  token?: string;
  language?: Language | string; // 백엔드에서 "ja", "ko" 등 다양한 형식으로 올 수 있음
  // API 응답 형식에 따라 추가 가능
}

export const loginAPI = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/api/users/login", data);
  return response.data;
};

// 로그아웃 API
export const logoutAPI = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};


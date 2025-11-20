import { create } from "zustand";
import toast from "react-hot-toast";
import type { Language } from "./useLanguageStore";
import { useLanguage } from "./useLanguageStore";
import { signupAPI, loginAPI, logoutAPI } from "../api/auth";

interface Session {
  name: string;
  email: string;
  aiTutorToken: string;
  language?: Language;
}

interface AuthState {
  session: Session | null;
  status: "unauthenticated" | "loading" | "authenticated";
  error: string | null;

  signup: (
    userid: string,
    username: string,
    password: string,
    language: Language
  ) => Promise<void>;
  login: (userid: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  status: "unauthenticated",
  error: null,

  signup: async (
    userid: string,
    username: string,
    password: string,
    language: Language
  ) => {
    set({ status: "loading", error: null });

    try {
      // 언어 코드를 API 형식으로 변환 (KR -> ko, EN -> en 등)
      const languageMap: Record<Language, string> = {
        KR: "ko",
        CN: "zh",
        EN: "en",
        JP: "ja",
        VI: "vi",
      };

      // API 호출 - API 스펙에 맞게 데이터 변환
      const signupResponse = await signupAPI({
        user_id: userid,
        username: username,
        password: password,
        language: languageMap[language] || language.toLowerCase(),
      });

      // 백엔드에서 받은 language가 있으면 사용, 없으면 회원가입 시 선택한 언어 사용
      const languageMapReverse: Record<string, Language> = {
        ko: "KR",
        en: "EN",
        zh: "CN",
        ja: "JP",
        vi: "VI",
        KR: "KR",
        EN: "EN",
        CN: "CN",
        JP: "JP",
        VI: "VI",
      };

      const finalLanguage = signupResponse.language
        ? languageMapReverse[signupResponse.language] || language
        : language;

      // 언어를 localStorage에 저장
      localStorage.setItem("userLanguage", finalLanguage);

      // 언어 스토어도 업데이트
      useLanguage.getState().setLanguage(finalLanguage);

      // 성공 처리
      set({
        status: "unauthenticated",
        error: null,
      });

      // 성공 토스트 표시
      toast.success("회원가입이 완료되었습니다!");
    } catch (err) {
      // API 에러 메시지 추출
      let errorMessage = "회원가입에 실패했습니다. 다시 시도해주세요.";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      set({
        status: "unauthenticated",
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  login: async (userid: string, password: string) => {
    set({ status: "loading", error: null });

    try {
      // API 호출
      const loginResponse = await loginAPI({
        user_id: userid,
        password: password,
      });

      // API 응답에서 토큰 추출 (있으면 사용, 없으면 빈 문자열)
      const token = loginResponse.aiTutorToken || loginResponse.token || "";

      // 언어 추출 - 백엔드에서 받은 language를 우선 사용
      // 기존 코드(ko, en 등)와 새 코드(KR, EN 등) 모두 지원
      const languageMap: Record<string, Language> = {
        ko: "KR",
        en: "EN",
        zh: "CN",
        ja: "JP",
        vi: "VI",
        KR: "KR",
        EN: "EN",
        CN: "CN",
        JP: "JP",
        VI: "VI",
        // 추가 변형 지원
        korean: "KR",
        english: "EN",
        chinese: "CN",
        japanese: "JP",
        vietnamese: "VI",
      };
      
      // 백엔드 응답의 language를 우선 사용
      let userLanguage: Language = "KR"; // 기본값
      
      if (loginResponse.language) {
        const backendLang = String(loginResponse.language).toLowerCase();
        // 먼저 정확한 매칭 시도
        if (languageMap[loginResponse.language]) {
          userLanguage = languageMap[loginResponse.language];
        } 
        // 소문자로 변환해서 매칭 시도
        else if (languageMap[backendLang]) {
          userLanguage = languageMap[backendLang];
        }
        // 대문자로 변환해서 매칭 시도 (JP, KR 등)
        else if (languageMap[backendLang.toUpperCase()]) {
          userLanguage = languageMap[backendLang.toUpperCase()];
        }
        // 직접 Language 타입인지 확인
        else {
          const upperLang = String(loginResponse.language).toUpperCase();
          if (["KR", "CN", "EN", "JP", "VI"].includes(upperLang)) {
            userLanguage = upperLang as Language;
          }
        }
        
        // 디버깅용 로그 (개발 환경에서만)
        if (import.meta.env.DEV) {
          console.log("백엔드 language 응답:", loginResponse.language);
          console.log("변환된 language:", userLanguage);
        }
      }

      // 세션 데이터 구성
      const loginData: Session = {
        name: loginResponse.name || loginResponse.username || userid,
        email: loginResponse.email || userid,
        aiTutorToken: token,
        language: userLanguage,
      };

      // 토큰과 언어를 localStorage에 저장 (토큰이 있으면만 저장)
      if (token) {
        localStorage.setItem("aiTutorToken", token);
      }
      localStorage.setItem("userLanguage", userLanguage);

      set({
        session: loginData,
        status: "authenticated",
        error: null,
      });

      // 언어 스토어도 업데이트하여 언어 선택 탭에 반영
      useLanguage.getState().setLanguage(userLanguage);

      // 성공 토스트 표시
      toast.success("로그인에 성공했습니다!");
    } catch (err) {
      // API 에러 메시지 추출
      let errorMessage = "로그인에 실패했습니다. 다시 시도해주세요.";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      set({
        status: "unauthenticated",
        error: errorMessage,
      });
    }
  },

  logout: async () => {
    try {
      // API 호출 (환경 변수 VITE_API_BASE_URL이 설정되어 있으면 실제 API 호출)
      if (import.meta.env.VITE_API_BASE_URL) {
        await logoutAPI();
      }
    } catch (err) {
      // 로그아웃 API 실패해도 클라이언트에서는 로그아웃 처리
      console.error("Logout API error:", err);
    } finally {
      // localStorage 정리
      localStorage.removeItem("aiTutorToken");
      localStorage.removeItem("userLanguage");

      set({
        session: null,
        status: "unauthenticated",
        error: null,
      });

      // 로그아웃 토스트 표시
      toast.success("로그아웃되었습니다.");
    }
  },
}));

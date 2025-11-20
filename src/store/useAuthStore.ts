import { create } from 'zustand';
import axios from 'axios';

interface Session {
  name: string;
  email: string;
  aiTutorToken: string;
}

interface AuthState {
  session: Session | null;
  status: 'unauthenticated' | 'loading' | 'authenticated';
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  status: 'unauthenticated',
  error: null,

  login: async (email: string, password: string) => {
    set({ status: 'loading', error: null });

    try {
      // 🔥 실제 백엔드가 주는 login API를 여기에 매핑
      // const res = await axios.post("/auth/login", { email, password });

      // 🧪 Mock 데이터 (백엔드가 있다고 가정)
      const res = {
        data: {
          name: '최원빈 교수님',
          email: email,
          aiTutorToken: 'mock-ai-token-123',
        },
      };

      set({
        session: res.data,
        status: 'authenticated',
      });
    } catch (err: any) {
      set({
        status: 'unauthenticated',
        error: '로그인 실패',
      });
    }
  },

  logout: () => {
    set({
      session: null,
      status: 'unauthenticated',
      error: null,
    });
  },
}));

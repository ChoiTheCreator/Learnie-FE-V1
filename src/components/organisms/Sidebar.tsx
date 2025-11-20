import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, translations } from "../../store/useLanguageStore";
import { useAuth } from "../../store/useAuthStore";
import { Icon } from "../atoms";

const Sidebar = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { logout } = useAuth();
  const t = translations[language];
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  // 임시 강의 목록 (실제로는 API에서 가져옴)
  const courses = [
    "콘텐츠 스토리 텔링",
    "게임 엔진 1",
    "역사와 문명",
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* 로고 */}
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={() => navigate("/home")}
          className="text-xl font-Pretendard font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          Orbit AI
        </button>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/home"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-colors"
            >
              <Icon name="home" />
              {t.home.sidebar.home}
            </a>
          </li>
          <li>
            <button
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon name="book" />
                {t.home.sidebar.courses}
              </div>
              <Icon
                name={isCoursesOpen ? "chevron-up" : "chevron-down"}
                className="w-4 h-4 transition-transform"
              />
            </button>
            {isCoursesOpen && (
              <ul className="mt-2 ml-8 space-y-1">
                {courses.map((course, index) => (
                  <li key={index}>
                    <a
                      href={`/course/${index}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                    >
                      {course}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* 로그아웃 */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon name="logout" />
          {t.home.sidebar.logout}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


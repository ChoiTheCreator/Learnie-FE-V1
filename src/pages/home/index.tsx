import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, translations } from "../../store/useLanguageStore";
import Sidebar from "./components/Sidebar";
import UploadModal from "./components/UploadModal";

const LANGUAGE_OPTIONS = [
  { code: "ko" as const, label: "한국어" },
  { code: "en" as const, label: "English" },
  { code: "zh" as const, label: "中文" },
  { code: "ja" as const, label: "日本語" },
  { code: "vi" as const, label: "Tiếng Việt" },
  { code: "mn" as const, label: "Монгол" },
] as const;

const HomePage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].home;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      <Sidebar />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
        {/* 헤더 */}
        <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-xl font-Pretendard font-semibold text-gray-900">
            {t.sidebar.home}
          </h1>

          <div className="flex items-center gap-4">
            {/* 언어 선택 버튼 */}
            <div className="flex gap-2">
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  onClick={() => setLanguage(option.code)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    language === option.code
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div
            className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-300 bg-gray-50"
            }`}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(false);

              const files = Array.from(e.dataTransfer.files);
              if (files.length > 0) {
                setSelectedFiles(files);
                setIsModalOpen(true);
              }
            }}
          >
            <label
              htmlFor="file-upload-drop"
              className="flex flex-col items-center justify-center cursor-pointer p-12"
            >
              {/* 구름 아이콘 */}
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-600 font-Pretendard text-lg mb-2">
                파일을 첨부해 주세요!
              </p>
              <p className="text-gray-400 font-Pretendard text-sm">
                파일을 드래그하거나 클릭하여 업로드하세요
              </p>
            </label>
            <input
              id="file-upload-drop"
              type="file"
              accept="audio/*,video/*,.mp3,.mp4,.wav"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setSelectedFiles(Array.from(files));
                  setIsModalOpen(true);
                }
              }}
            />
          </div>
        </main>

        {/* 업로드 모달 */}
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFiles([]);
            // 파일 input 초기화
            const fileInput = document.getElementById(
              "file-upload-drop"
            ) as HTMLInputElement;
            if (fileInput) {
              fileInput.value = "";
            }
          }}
          onConfirm={async (classTitle, files) => {
            try {
              // TODO: 실제 파일 업로드 API 호출
              // const formData = new FormData();
              // formData.append("title", classTitle);
              // files.forEach((file) => {
              //   formData.append("files", file);
              // });
              // const response = await axiosInstance.post("/api/upload", formData, {
              //   headers: {
              //     "Content-Type": "multipart/form-data",
              //   },
              // });

              // Mock: 업로드 성공 시뮬레이션
              console.log("업로드 확인:", { classTitle, files });

              // 업로드 성공 후 콘텐츠 상세 페이지로 이동
              // 실제로는 API 응답에서 contentId를 받아와야 함
              const mockContentId = Date.now().toString();
              navigate(`/home/content/${mockContentId}`);

              setIsModalOpen(false);
              setSelectedFiles([]);
            } catch (error) {
              console.error("파일 업로드 실패:", error);
              alert("파일 업로드에 실패했습니다.");
            }
          }}
          files={selectedFiles}
        />
      </div>
    </div>
  );
};

export default HomePage;

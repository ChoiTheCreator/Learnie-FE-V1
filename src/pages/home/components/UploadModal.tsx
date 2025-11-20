import { useState, useEffect } from "react";
import { useLanguage, translations } from "../../../store/useLanguageStore";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (classTitle: string, files: File[]) => void;
  files: File[];
}

const UploadModal = ({ isOpen, onClose, onConfirm, files }: UploadModalProps) => {
  const { language } = useLanguage();
  const t = translations[language].home.uploadModal;
  const [classTitle, setClassTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      setClassTitle("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (classTitle.trim() && files.length > 0) {
      onConfirm(classTitle.trim(), files);
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        {/* 파일 정보 - 점선 테두리 박스 */}
        <div className="mb-6">
          <div className="border-2 border-dashed border-primary/50 rounded-lg px-4 py-6 min-h-[80px] flex items-center justify-center">
            {files.length > 0 ? (
              <div className="text-center">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="text-primary font-Pretendard text-sm font-medium"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm font-Pretendard">
                {t.fileInfo}
              </p>
            )}
          </div>
        </div>

        {/* 수업 제목 입력 */}
        <div className="mb-6">
          <input
            type="text"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 font-Pretendard focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-Pretendard font-medium hover:bg-gray-50 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!classTitle.trim() || files.length === 0}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-Pretendard font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;


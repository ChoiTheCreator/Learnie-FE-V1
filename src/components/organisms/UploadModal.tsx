import { useState, useEffect } from "react";
import { useLanguage, translations } from "../../store/useLanguageStore";
import { FileInfo } from "../molecules";
import { Input, Button } from "../atoms";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (classTitle: string, files: File[]) => void;
  files: File[];
}

const UploadModal = ({
  isOpen,
  onClose,
  onConfirm,
  files,
}: UploadModalProps) => {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        {/* 파일 정보 */}
        <div className="mb-4">
          <FileInfo files={files} />
        </div>

        {/* 수업 제목 입력 */}
        <div className="mb-6">
          <Input
            type="text"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
            placeholder={t.classTitle}
            className="w-full"
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            {t.cancel}
          </Button>
          <Button
            variant="outline"
            onClick={handleConfirm}
            disabled={!classTitle.trim() || files.length === 0}
          >
            {t.confirm}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;


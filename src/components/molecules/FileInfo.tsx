interface FileInfoProps {
  files: File[];
}

const FileInfo = ({ files }: FileInfoProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded px-4 py-3 min-h-[60px] flex flex-col justify-center">
      <p className="text-gray-600 text-sm font-Pretendard mb-2">파일 정보</p>
      <div className="space-y-1">
        {files.map((file, index) => (
          <div key={index} className="text-gray-800 text-sm font-Pretendard">
            <span className="font-medium">{file.name}</span>
            <span className="text-gray-500 ml-2">
              ({formatFileSize(file.size)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileInfo;


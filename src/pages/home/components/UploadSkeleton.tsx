const UploadSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* 업로드 중 메시지 */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
          <p className="text-primary font-Pretendard font-medium text-lg">
            파일을 업로드하고 있습니다...
          </p>
        </div>
      </div>

      {/* 스켈레톤 UI */}
      <div className="w-full max-w-2xl space-y-4">
        {/* 파일 정보 스켈레톤 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* 진행 상태 스켈레톤 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSkeleton;


const QuizSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* 퀴즈 생성 중 메시지 */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
          <p className="text-primary font-Pretendard font-medium">
            퀴즈를 생성하고 있습니다...
          </p>
        </div>
      </div>

      {/* 스켈레톤 테이블 */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-Pretendard font-semibold text-gray-700 uppercase border-b border-gray-200">
                퀴즈 번호
              </th>
              <th className="px-4 py-3 text-left text-xs font-Pretendard font-semibold text-gray-700 uppercase border-b border-gray-200">
                문제 개수
              </th>
              <th className="px-4 py-3 text-left text-xs font-Pretendard font-semibold text-gray-700 uppercase border-b border-gray-200">
                난이도
              </th>
              <th className="px-4 py-3 text-left text-xs font-Pretendard font-semibold text-gray-700 uppercase border-b border-gray-200">
                생성일
              </th>
              <th className="px-4 py-3 text-left text-xs font-Pretendard font-semibold text-gray-700 uppercase border-b border-gray-200">
                다운로드
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((index) => (
              <tr
                key={index}
                className={index !== 3 ? "border-b border-gray-200" : ""}
              >
                <td className="px-4 py-3">
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizSkeleton;


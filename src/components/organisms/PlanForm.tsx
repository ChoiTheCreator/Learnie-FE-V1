import { Label, Button } from "../atoms";

interface PlanFormProps {
  goalDays: number;
  dailyHours: number;
  onGoalDaysChange: (days: number) => void;
  onDailyHoursChange: (hours: number) => void;
  onSubmit: () => void;
}

const PlanForm = ({
  goalDays,
  dailyHours,
  onGoalDaysChange,
  onDailyHoursChange,
  onSubmit,
}: PlanFormProps) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-Pretendard font-semibold text-gray-900 mb-6">
        계획
      </h3>

      {/* 목표 설정 */}
      <div className="mb-4">
        <Label>목표 설정</Label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={goalDays}
            onChange={(e) => onGoalDaysChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded text-sm font-Pretendard w-24 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm text-gray-600 font-Pretendard">일</span>
        </div>
      </div>

      {/* 일일 가용 시간 */}
      <div className="mb-6">
        <Label>일일 가용 시간</Label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="24"
            value={dailyHours}
            onChange={(e) => onDailyHoursChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded text-sm font-Pretendard w-24 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm text-gray-600 font-Pretendard">시간</span>
        </div>
      </div>

      {/* 계획 생성 버튼 */}
      <Button variant="outline" onClick={onSubmit} className="w-full">
        계획 생성
      </Button>
    </div>
  );
};

export default PlanForm;


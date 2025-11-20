import { useLanguage, translations } from "../../store/useLanguageStore";
import { Label, Button } from "../atoms";

interface QuizFormProps {
  questionCount: number;
  difficulty: "high" | "medium" | "low" | null;
  questionType:
    | "shortAnswer"
    | "trueFalse"
    | "multipleChoice"
    | null;
  onQuestionCountChange: (count: number) => void;
  onDifficultyChange: (difficulty: "high" | "medium" | "low" | null) => void;
  onQuestionTypeChange: (
    type: "shortAnswer" | "trueFalse" | "multipleChoice" | null
  ) => void;
  onSubmit: () => void;
}

const QuizForm = ({
  questionCount,
  difficulty,
  questionType,
  onQuestionCountChange,
  onDifficultyChange,
  onQuestionTypeChange,
  onSubmit,
}: QuizFormProps) => {
  const { language } = useLanguage();
  const t = translations[language].home.content;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-Pretendard font-semibold text-gray-900 mb-4">
        {t.quiz}
      </h3>

      {/* 문제 개수 */}
      <div className="mb-4">
        <Label>{t.questionCount}</Label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="10"
            value={questionCount}
            onChange={(e) => onQuestionCountChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded text-sm font-Pretendard w-20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm text-gray-600">
            {t.questions} ({t.maxQuestions} 10 {t.questions})
          </span>
        </div>
      </div>

      {/* 난이도 */}
      <div className="mb-4">
        <Label>{t.difficulty}</Label>
        <div className="flex gap-2">
          {(["high", "medium", "low"] as const).map((level) => (
            <button
              key={level}
              onClick={() =>
                onDifficultyChange(difficulty === level ? null : level)
              }
              className={`px-4 py-2 rounded border text-sm font-Pretendard transition-colors ${
                difficulty === level
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {
                {
                  high: t.difficultyHigh,
                  medium: t.difficultyMedium,
                  low: t.difficultyLow,
                }[level]
              }
            </button>
          ))}
        </div>
      </div>

      {/* 문제 유형 */}
      <div className="mb-6">
        <Label>{t.questionType}</Label>
        <div className="flex gap-2">
          {(
            [
              "shortAnswer",
              "trueFalse",
              "multipleChoice",
            ] as const
          ).map((type) => (
            <button
              key={type}
              onClick={() =>
                onQuestionTypeChange(questionType === type ? null : type)
              }
              className={`px-4 py-2 rounded border text-sm font-Pretendard transition-colors ${
                questionType === type
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {
                {
                  shortAnswer: t.questionTypeShortAnswer,
                  trueFalse: t.questionTypeTrueFalse,
                  multipleChoice: t.questionTypeMultipleChoice,
                }[type]
              }
            </button>
          ))}
        </div>
      </div>

      {/* 문제지 생성 버튼 */}
      <Button
        variant="outline"
        onClick={onSubmit}
        disabled={!difficulty || !questionType}
        className="w-full"
      >
        {t.generateQuiz}
      </Button>
    </div>
  );
};

export default QuizForm;


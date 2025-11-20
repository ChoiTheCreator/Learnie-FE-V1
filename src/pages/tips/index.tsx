import { useState } from "react";
import { useLanguage } from "../../store/useLanguageStore";
import Sidebar from "../home/components/Sidebar";

// 더미 데이터
const tipsData = {
  ko: {
    categories: [
      {
        id: "study",
        title: "공부 꿀팁",
        items: [
          {
            id: "note-taking",
            title: "효과적인 필기법",
            content: `## 효과적인 필기법

### 1. 코넬 노트 시스템
- 페이지를 세 부분으로 나누기
- 오른쪽: 강의 내용 필기
- 왼쪽: 핵심 키워드와 질문
- 하단: 요약

### 2. 마인드맵 활용
- 중심 주제에서 시작
- 가지를 뻗어가며 연결
- 시각적 기억에 도움

### 3. 색상 코딩
- 중요도에 따라 색상 구분
- 빨강: 매우 중요
- 파랑: 개념 설명
- 초록: 예시
`,
          },
          {
            id: "time-management",
            title: "시간 관리 전략",
            content: `## 시간 관리 전략

### 포모도로 기법
- 25분 집중 + 5분 휴식
- 4회 반복 후 긴 휴식
- 집중력 향상에 효과적

### 우선순위 매트릭스
- 긴급하고 중요한 것부터
- 계획적으로 일정 관리
- 데드라인 명확히 설정
`,
          },
        ],
      },
      {
        id: "campus",
        title: "캠퍼스 생활",
        items: [
          {
            id: "library",
            title: "도서관 이용 꿀팁",
            content: `## 도서관 이용 꿀팁

### 조용한 공간 찾기
- 개인 열람실 예약
- 조용한 구역 확인
- 이어폰 필수

### 자료 검색
- 온라인 카탈로그 활용
- 교수님 추천 도서 확인
- 전자책도 활용하기
`,
          },
          {
            id: "cafeteria",
            title: "학식 이용 팁",
            content: `## 학식 이용 팁

### 시간대별 추천
- 점심: 11:30-12:30 (혼잡)
- 저녁: 17:30 이후 (한산)
- 주말: 운영 시간 확인 필수

### 가성비 메뉴
- 일품요리보다 정식
- 학생 할인 확인
- 쿠폰 적극 활용
`,
          },
        ],
      },
      {
        id: "exam",
        title: "시험 준비",
        items: [
          {
            id: "exam-prep",
            title: "시험 준비 전략",
            content: `## 시험 준비 전략

### 2주 전
- 전체 범위 훑어보기
- 약한 부분 파악
- 계획 세우기

### 1주 전
- 핵심 내용 정리
- 기출문제 풀기
- 암기 내용 반복

### 시험 전날
- 무리한 공부 금지
- 충분한 휴식
- 준비물 미리 챙기기
`,
          },
        ],
      },
    ],
  },
  en: {
    categories: [
      {
        id: "study",
        title: "Study Tips",
        items: [
          {
            id: "note-taking",
            title: "Effective Note-Taking",
            content: `## Effective Note-Taking

### 1. Cornell Note System
- Divide page into three sections
- Right: Lecture notes
- Left: Key keywords and questions
- Bottom: Summary

### 2. Mind Mapping
- Start from central topic
- Branch out and connect
- Helps visual memory

### 3. Color Coding
- Color code by importance
- Red: Very important
- Blue: Concept explanations
- Green: Examples
`,
          },
          {
            id: "time-management",
            title: "Time Management Strategies",
            content: `## Time Management Strategies

### Pomodoro Technique
- 25 minutes focus + 5 minutes break
- Long break after 4 cycles
- Effective for concentration

### Priority Matrix
- Start with urgent and important
- Manage schedule systematically
- Set clear deadlines
`,
          },
        ],
      },
      {
        id: "campus",
        title: "Campus Life",
        items: [
          {
            id: "library",
            title: "Library Tips",
            content: `## Library Tips

### Finding Quiet Spaces
- Reserve private study rooms
- Check quiet zones
- Bring headphones

### Resource Search
- Use online catalog
- Check professor's recommended books
- Utilize e-books
`,
          },
          {
            id: "cafeteria",
            title: "Cafeteria Tips",
            content: `## Cafeteria Tips

### Recommended Times
- Lunch: 11:30-12:30 (crowded)
- Dinner: After 17:30 (quiet)
- Weekend: Check operating hours

### Value Meals
- Regular meals over special dishes
- Check student discounts
- Use coupons actively
`,
          },
        ],
      },
      {
        id: "exam",
        title: "Exam Preparation",
        items: [
          {
            id: "exam-prep",
            title: "Exam Preparation Strategy",
            content: `## Exam Preparation Strategy

### 2 Weeks Before
- Review entire scope
- Identify weak areas
- Make a plan

### 1 Week Before
- Organize key content
- Solve past exam papers
- Repeat memorization

### Day Before Exam
- Avoid excessive studying
- Get enough rest
- Prepare materials in advance
`,
          },
        ],
      },
    ],
  },
  zh: {
    categories: [
      {
        id: "study",
        title: "学习技巧",
        items: [
          {
            id: "note-taking",
            title: "有效的笔记方法",
            content: `## 有效的笔记方法

### 1. 康奈尔笔记系统
- 将页面分为三部分
- 右侧：课堂笔记
- 左侧：关键词和问题
- 底部：摘要

### 2. 思维导图
- 从中心主题开始
- 分支展开并连接
- 有助于视觉记忆

### 3. 颜色编码
- 按重要性分类颜色
- 红色：非常重要
- 蓝色：概念说明
- 绿色：示例
`,
          },
          {
            id: "time-management",
            title: "时间管理策略",
            content: `## 时间管理策略

### 番茄工作法
- 25分钟专注 + 5分钟休息
- 4次循环后长休息
- 有效提高专注力

### 优先级矩阵
- 从紧急重要的事情开始
- 系统化管理日程
- 设定明确的截止日期
`,
          },
        ],
      },
      {
        id: "campus",
        title: "校园生活",
        items: [
          {
            id: "library",
            title: "图书馆使用技巧",
            content: `## 图书馆使用技巧

### 寻找安静空间
- 预约个人阅览室
- 确认安静区域
- 必备耳机

### 资料搜索
- 使用在线目录
- 查看教授推荐书籍
- 利用电子书
`,
          },
          {
            id: "cafeteria",
            title: "食堂使用技巧",
            content: `## 食堂使用技巧

### 时间段推荐
- 午餐：11:30-12:30（拥挤）
- 晚餐：17:30后（清静）
- 周末：确认营业时间

### 性价比菜单
- 正餐优于特餐
- 确认学生折扣
- 积极使用优惠券
`,
          },
        ],
      },
      {
        id: "exam",
        title: "考试准备",
        items: [
          {
            id: "exam-prep",
            title: "考试准备策略",
            content: `## 考试准备策略

### 2周前
- 浏览整个范围
- 找出薄弱环节
- 制定计划

### 1周前
- 整理核心内容
- 做历年真题
- 重复记忆内容

### 考试前一天
- 避免过度学习
- 充分休息
- 提前准备物品
`,
          },
        ],
      },
    ],
  },
  ja: {
    categories: [
      {
        id: "study",
        title: "勉強のコツ",
        items: [
          {
            id: "note-taking",
            title: "効果的なノートの取り方",
            content: `## 効果的なノートの取り方

### 1. コーネルノートシステム
- ページを3つの部分に分ける
- 右側：講義内容
- 左側：キーワードと質問
- 下部：要約

### 2. マインドマップ
- 中心テーマから始める
- 枝を広げて接続
- 視覚的記憶に役立つ

### 3. カラーコーディング
- 重要度で色分け
- 赤：非常に重要
- 青：概念説明
- 緑：例
`,
          },
          {
            id: "time-management",
            title: "時間管理戦略",
            content: `## 時間管理戦略

### ポモドーロテクニック
- 25分集中 + 5分休憩
- 4回繰り返した後長い休憩
- 集中力向上に効果的

### 優先順位マトリックス
- 緊急で重要なことから
- 計画的にスケジュール管理
- 明確な締切を設定
`,
          },
        ],
      },
      {
        id: "campus",
        title: "キャンパス生活",
        items: [
          {
            id: "library",
            title: "図書館利用のコツ",
            content: `## 図書館利用のコツ

### 静かな空間を見つける
- 個人閲覧室を予約
- 静かなエリアを確認
- イヤホン必須

### 資料検索
- オンラインカタログを活用
- 教授の推薦図書を確認
- 電子書籍も活用
`,
          },
          {
            id: "cafeteria",
            title: "学食利用のコツ",
            content: `## 学食利用のコツ

### 時間帯別推奨
- 昼食：11:30-12:30（混雑）
- 夕食：17:30以降（空いている）
- 週末：営業時間を確認

### コスパメニュー
- 一品料理より定食
- 学生割引を確認
- クーポンを積極的に活用
`,
          },
        ],
      },
      {
        id: "exam",
        title: "試験準備",
        items: [
          {
            id: "exam-prep",
            title: "試験準備戦略",
            content: `## 試験準備戦略

### 2週間前
- 全体範囲を確認
- 弱い部分を把握
- 計画を立てる

### 1週間前
- 核心内容を整理
- 過去問を解く
- 暗記内容を繰り返す

### 試験前日
- 無理な勉強は禁止
- 十分な休息
- 準備物を事前に用意
`,
          },
        ],
      },
    ],
  },
};

const TipsPage = () => {
  const { language } = useLanguage();

  const data = tipsData[language as keyof typeof tipsData] || tipsData.ko;
  const [selectedCategory, setSelectedCategory] = useState(
    data.categories[0].id
  );
  const [selectedItem, setSelectedItem] = useState(
    data.categories[0].items[0].id
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set([data.categories[0].id])
  );

  const currentCategory = data.categories.find(
    (cat) => cat.id === selectedCategory
  );
  const currentItem = currentCategory?.items.find(
    (item) => item.id === selectedItem
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.has(categoryId);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: 목차 (나무위키 스타일) */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-Pretendard font-semibold text-gray-900 mb-4">
              Index
            </h2>
            <nav className="space-y-2">
              {data.categories.map((category) => {
                const isExpanded = isCategoryExpanded(category.id);
                const isSelected = selectedCategory === category.id;

                return (
                  <div key={category.id} className="mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label={isExpanded ? "접기" : "펼치기"}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedItem(category.items[0].id);
                          // 카테고리 선택 시 자동으로 펼치기
                          if (!isExpanded) {
                            setExpandedCategories((prev) =>
                              new Set(prev).add(category.id)
                            );
                          }
                        }}
                        className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-Pretendard transition-colors ${
                          isSelected
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category.title}
                      </button>
                    </div>
                    {isExpanded && (
                      <ul className="mt-2 ml-8 space-y-1">
                        {category.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => setSelectedItem(item.id)}
                              className={`w-full text-left px-3 py-2 rounded-md text-xs font-Pretendard transition-colors ${
                                selectedItem === item.id
                                  ? "bg-primary/5 text-primary font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              {item.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 오른쪽: 내용 */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            {currentItem && (
              <article className="prose prose-sm max-w-none font-Pretendard">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {currentItem.title}
                </h1>
                <div className="text-gray-700 leading-relaxed">
                  {currentItem.content.split("\n").map((line, index) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-2xl font-semibold mt-8 mb-4 text-gray-900 border-b border-gray-200 pb-2"
                        >
                          {line.substring(3)}
                        </h2>
                      );
                    }
                    if (line.startsWith("### ")) {
                      return (
                        <h3
                          key={index}
                          className="text-xl font-semibold mt-6 mb-3 text-gray-800"
                        >
                          {line.substring(4)}
                        </h3>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-6 mb-2 list-disc">
                          {line.substring(2)}
                        </li>
                      );
                    }
                    if (line.trim() === "") {
                      return <br key={index} />;
                    }
                    return (
                      <p key={index} className="mb-3">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsPage;

# HomePage 코드 설명

## 파일 위치

`src/pages/home/index.tsx`

## 전체 구조

HomePage는 강의 콘텐츠를 보여주고 관리하는 메인 페이지입니다. 왼쪽에는 번역본, 오른쪽에는 요약/퀴즈/심화 탭이 있는 2단 레이아웃입니다.

---

## 주요 컴포넌트 및 기능

### 1. **상태 관리 (State Management)**

```typescript
// 모달 관련
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

// 탭 관리
const [activeTab, setActiveTab] = useState<"summary" | "quiz" | "advanced">(
  "summary"
);

// 퀴즈 생성 관련
const [showQuizCreateForm, setShowQuizCreateForm] = useState(false);
const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
const [questionCount, setQuestionCount] = useState<number>(5);
const [difficulty, setDifficulty] = useState<"high" | "medium" | "low" | null>(
  null
);
const [questionType, setQuestionType] = useState<
  "shortAnswer" | "trueFalse" | "multipleChoice" | null
>(null);

// 계획 생성 관련
const [showPlanCreateForm, setShowPlanCreateForm] = useState(false);
const [goalDays, setGoalDays] = useState<number>(1);
const [dailyHours, setDailyHours] = useState<number>(1);
```

**설명:**

- 각 기능별로 독립적인 상태를 관리합니다
- 퀴즈 생성과 계획 생성은 별도의 폼 상태를 가집니다

---

### 2. **레이아웃 구조**

```
HomePage
├── Sidebar (왼쪽 고정 사이드바)
└── 메인 콘텐츠 영역
    ├── Header (뒤로가기 버튼 + 언어 선택)
    └── Main Content
        ├── 왼쪽: 번역본 섹션
        └── 오른쪽: 탭 컨텐츠
            ├── 탭 버튼 (요약/퀴즈/심화)
            └── 탭별 컨텐츠
```

---

### 3. **왼쪽: 번역본 섹션 (Lines 123-142)**

```typescript
<div className="flex-1 border-r border-gray-200 pr-8">
  <h2>{t.content.translation}</h2>
  <div className="space-y-4 text-gray-700 font-Pretendard">
    {/* 번역된 강의 내용 표시 */}
  </div>
</div>
```

**기능:**

- 강의 녹음본을 번역한 텍스트를 표시
- 현재는 더미 데이터로 구성
- 실제로는 API에서 번역본을 받아와 표시할 예정

---

### 4. **오른쪽: 탭 컨텐츠 섹션**

#### 4.1 탭 버튼 (Lines 146-178)

```typescript
<div className="flex gap-2 mb-6">
  <button onClick={() => setActiveTab("summary")}>요약</button>
  <button onClick={() => setActiveTab("quiz")}>퀴즈</button>
  <button onClick={() => setActiveTab("advanced")}>심화</button>
</div>
```

**기능:**

- 3개의 탭: 요약, 퀴즈, 심화
- 활성 탭에 따라 다른 컨텐츠 표시
- 활성 탭은 primary 색상으로 강조

---

#### 4.2 요약 탭 (Lines 182-195)

**기능:**

- 강의 내용의 요약본 표시
- 핵심 개념과 중요한 포인트 정리
- 현재는 더미 데이터

---

#### 4.3 퀴즈 탭 (Lines 197-463)

**주요 기능:**

1. **퀴즈 생성 버튼** (Lines 199-211)

   - "퀴즈 생성" 버튼 클릭 시 폼 표시/숨김

2. **퀴즈 생성 폼** (Lines 214-391)

   - **문제 개수**: 1-10개 선택 (기본값: 5개)
   - **난이도**: 상/중/하 선택 (토글 방식)
   - **문제 유형**: 단답형/O.X/객관식 선택 (토글 방식)
   - **생성 버튼**: 난이도와 문제 유형이 선택되어야 활성화

3. **퀴즈 생성 프로세스** (Lines 352-384)

   ```typescript
   onClick={async () => {
     // 1. 유효성 검사
     if (!difficulty || !questionType) {
       alert("난이도와 문제 유형을 선택해주세요.");
       return;
     }

     // 2. 로딩 상태 시작
     setIsGeneratingQuiz(true);
     setShowQuizCreateForm(false);

     // 3. API 호출 (현재는 Mock)
     // await generateQuizAPI({ questionCount, difficulty, questionType });

     // 4. 완료 후 상태 초기화
     setIsGeneratingQuiz(false);
   }}
   ```

4. **퀴즈 리스트 테이블** (Lines 397-461)

   - 생성된 퀴즈 목록을 테이블로 표시
   - 컬럼: 퀴즈 번호, 문제 개수, 난이도, 생성일, 다운로드
   - 행 클릭 시 해당 퀴즈 상세 페이지로 이동
   - 다운로드 버튼으로 PDF 다운로드 (구현 예정)

5. **퀴즈 생성 중 스켈레톤 UI** (Line 394)
   - 생성 중일 때 로딩 UI 표시
   - `QuizSkeleton` 컴포넌트 사용

---

#### 4.4 심화 탭 (Lines 465-554)

**주요 기능:**

1. **초기 상태** (Lines 472-484)

   - "현재 생성 계획 없음" 메시지
   - "계획 생성" 버튼

2. **계획 생성 폼** (Lines 487-552)
   - **목표 설정**: 일수 입력 (기본값: 1일)
   - **일일 가용 시간**: 시간 입력 (1-24시간, 기본값: 1시간)
   - **계획 생성 버튼**: 입력값을 기반으로 학습 계획 생성

---

### 5. **헤더 영역** (Lines 84-118)

```typescript
<header>
  {/* 뒤로가기 버튼 */}
  <button>←</button>

  {/* 언어 선택 버튼 */}
  <div>
    {LANGUAGE_OPTIONS.map((option) => (
      <button onClick={() => setLanguage(option.code)}>{option.label}</button>
    ))}
  </div>
</header>
```

**기능:**

- 뒤로가기 버튼 (현재 기능 없음, TODO)
- 언어 선택: 한국어, 영어, 중국어, 일본어, 베트남어, 몽골어

---

### 6. **하단 스크롤 버튼** (Lines 561-577)

```typescript
<div className="absolute bottom-8 left-1/2">
  <button className="bg-pink-500">{/* 위쪽 화살표 아이콘 */}</button>
</div>
```

**기능:**

- 페이지 상단으로 스크롤하는 버튼
- 현재 기능 구현 필요 (TODO)

---

### 7. **업로드 모달** (Lines 580-600)

```typescript
<UploadModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onConfirm={(classTitle, files) => {
    // 파일 업로드 로직
  }}
  files={selectedFiles}
/>
```

**기능:**

- 강의 파일 업로드를 위한 모달
- 파일 선택 및 수업 제목 입력
- 확인 시 업로드 처리 (구현 예정)

---

## 데이터 흐름

### 퀴즈 생성 흐름

```
1. 사용자가 "퀴즈 생성" 버튼 클릭
   ↓
2. showQuizCreateForm = true → 폼 표시
   ↓
3. 사용자가 설정 입력 (문제 개수, 난이도, 유형)
   ↓
4. "문제지 생성" 버튼 클릭
   ↓
5. 유효성 검사 → API 호출 (Mock)
   ↓
6. isGeneratingQuiz = true → 스켈레톤 UI 표시
   ↓
7. 생성 완료 → isGeneratingQuiz = false → 퀴즈 리스트 표시
```

### 계획 생성 흐름

```
1. 사용자가 "계획 생성" 버튼 클릭
   ↓
2. showPlanCreateForm = true → 폼 표시
   ↓
3. 사용자가 목표 일수와 일일 가용 시간 입력
   ↓
4. "계획 생성" 버튼 클릭
   ↓
5. API 호출 (구현 예정)
   ↓
6. 생성 완료 → showPlanCreateForm = false
```

---

## 주요 TODO 항목

1. **인증 처리** (Lines 36-75)

   - 로그인 상태 확인 및 리다이렉트
   - 현재는 주석 처리됨

2. **API 연동**

   - 퀴즈 생성 API 호출 (Line 364)
   - 계획 생성 API 호출 (Line 539)
   - 파일 업로드 API 호출 (Line 595)
   - 번역본 데이터 가져오기
   - 요약 데이터 가져오기

3. **기능 구현**
   - 뒤로가기 버튼 기능 (Line 86)
   - 스크롤 버튼 기능 (Line 562)
   - PDF 다운로드 기능 (Line 449)

---

## 사용된 컴포넌트

- `Sidebar`: 왼쪽 네비게이션 사이드바
- `UploadModal`: 파일 업로드 모달
- `QuizSkeleton`: 퀴즈 생성 중 로딩 UI

---

## 스타일링

- **Tailwind CSS** 사용
- **Pretendard 폰트** 적용
- **Primary 색상**: 활성 상태, 버튼 등에 사용
- **반응형 디자인**: flex 레이아웃으로 구성

---

## 번역 지원

모든 텍스트는 `useLanguageStore`의 `translations` 객체를 통해 다국어 지원됩니다.

- 한국어 (ko)
- 영어 (en)
- 중국어 (zh)
- 일본어 (ja)
- 베트남어 (vi)
- 몽골어 (mn)

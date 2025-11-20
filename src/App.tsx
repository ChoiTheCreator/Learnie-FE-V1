// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Next의 (routes)/home/page.tsx 이런 구조를 그대로 import한다고 가정
import HomePage from './app/(routes)/home/page';
import LoginPage from './app/(routes)/login/page';

import ConfirmPage from './app/(routes)/notes/[folderId]/confirm/page';
import CreatePracticePage from './app/(routes)/notes/[folderId]/create-practice/page';
import SummaryPage from './app/(routes)/notes/[folderId]/result/summary/page';

import TestPage from './app/(routes)/test/page';

function App() {
  return (
    <Routes>
      {/* 루트로 들어오면 /home으로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* /home */}
      <Route path="/home" element={<HomePage />} />

      {/* /login */}
      <Route path="/login" element={<LoginPage />} />

      {/* notes 관련 (folderId는 동적 파라미터) */}
      <Route path="/notes/:folderId/confirm" element={<ConfirmPage />} />
      <Route
        path="/notes/:folderId/create-practice"
        element={<CreatePracticePage />}
      />
      <Route path="/notes/:folderId/result/summary" element={<SummaryPage />} />

      {/* /test */}
      <Route path="/test" element={<TestPage />} />

      {/* 혹시 없던 주소 들어왔을 때 기본적으로 home으로 보냄 */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;

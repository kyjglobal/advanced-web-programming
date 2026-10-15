import { useState } from 'react';
import Timer from './Timer.jsx';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  function handleToggleTimer() {
    setShowTimer(prev => !prev);
  }

  // 조건부 렌더링: 표시하면 Mount, 숨기면 Unmount와 Effect Cleanup이 발생합니다.
  // 다시 표시하면 Timer의 State가 새로 생성되어 0초, Paused로 시작합니다.
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="./" aria-label="Skylearn 홈">
          <span className="brand-mark" aria-hidden="true">s<span>✦</span></span>
          skylearn<span className="brand-dot">.</span>
        </a>
        <span className="header-label">나만의 학습 도구</span>
        <span className="header-tag">FOCUS TIME</span>
      </header>
      <main>
        <div className="page-heading">
          <div><span className="eyebrow">작은 집중이 쌓이는 곳</span><h1>나의 집중 타이머<span className="heading-spark" aria-hidden="true">✦</span></h1><p>목표를 정하고, 나만의 속도로 한 걸음씩.</p></div>
          <button className="button toggle-button" type="button" onClick={handleToggleTimer} aria-expanded={showTimer}>
            {showTimer ? 'Timer 숨기기' : 'Timer 표시'}<span aria-hidden="true">{showTimer ? '−' : '+'}</span>
          </button>
        </div>
        {showTimer === true ? <Timer /> : (
          <section className="hidden-card"><span className="empty-symbol" aria-hidden="true">◷</span><h2>잠깐 쉬어 가도 괜찮아요.</h2><p>준비가 되면 Timer 표시 버튼을 눌러 새로 시작하세요.</p></section>
        )}
        <footer className="page-footer"><span className="footer-dot" />오늘도 나만의 속도로 성장하는 중<span className="footer-note">한 번에, 한 걸음씩.</span></footer>
      </main>
    </div>
  );
}

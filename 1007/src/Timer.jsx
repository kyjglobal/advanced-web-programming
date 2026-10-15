import { useEffect, useState } from 'react';

export default function Timer() {
  // seconds는 경과 시간, isRunning은 실행 여부를 관리합니다.
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  // 빈 입력을 허용하기 위해 입력값은 문자열로 보관합니다.
  const [targetTime, setTargetTime] = useState('');

  const targetSeconds = Number(targetTime);
  const hasTarget = targetTime.trim() !== '' &&
    Number.isFinite(targetSeconds) && targetSeconds > 0;
  const targetReached = hasTarget && seconds >= targetSeconds;

  // Effect 1: Mount/Unmount 관찰. State 변경에는 재실행되지 않습니다.
  useEffect(() => {
    console.log('Timer Mounted');
    return () => console.log('Timer Unmounted');
  }, []);
  // 개발 환경의 StrictMode는 검증을 위해 setup → cleanup → setup을 추가 실행합니다.

  // Effect 2: 실행 상태와 인터벌을 동기화합니다.
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      // 100ms마다 0.1초 증가. 반올림으로 소수 누적 오차를 줄입니다.
      setSeconds(prev => Math.round((prev + 0.1) * 10) / 10);
    }, 100);

    // Pause 또는 Unmount 시 기존 인터벌을 제거해 중복 실행을 방지합니다.
    return () => clearInterval(intervalId);
  }, [isRunning]);
  // Functional Update로 이전 seconds를 받으므로 의존성은 [isRunning]입니다.
  // 매 tick마다 인터벌을 다시 만들 필요가 없습니다.

  // Effect 3: 경과 시간과 목표의 비교 결과를 실행 상태에 반영합니다.
  // 목표 변경이나 Start 후에도 도달 상태라면 자동 Pause합니다.
  useEffect(() => {
    if (targetReached && isRunning) {
      setIsRunning(false);
    }
  }, [targetReached, isRunning]);

  // State가 변경되면 React가 컴포넌트를 다시 실행해 JSX를 계산하고 화면에 반영합니다.
  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  // Reset은 클릭에 대한 반응이므로 Effect가 아닌 이벤트 핸들러에서 처리합니다.
  function handleReset() {
    setSeconds(0);
    // 기존 조건대로 실행 여부와 Lap 기록, 목표 입력은 유지합니다.
  }

  function handleLap() {
    // push로 기존 배열을 수정하지 않고 새로운 배열을 만들어 State를 갱신합니다.
    setLaps(prev => [...prev, seconds]);
  }

  function handleTargetChange(event) {
    setTargetTime(event.target.value);
  }

  const progress = hasTarget ? Math.min(100, (seconds / targetSeconds) * 100) : 0;

  return (
    <div className="dashboard">
      <section className="timer-card card" aria-labelledby="timer-heading">
        <div className="card-top"><h2 id="timer-heading">집중 시간</h2><span className={`status ${isRunning ? 'running' : ''}`} role="status"><span />{isRunning ? 'Running' : 'Paused'}</span></div>
        <div className="clock-face">
          <span className="clock-kicker">지금, 나에게 집중하는 시간</span>
          <div className="time-display" aria-label={`현재 시간 ${seconds.toFixed(1)}초`}>{seconds.toFixed(1)}<span>초</span></div>
          <span className="clock-caption">{isRunning ? '좋아요. 차근차근 이어가 볼까요?' : '준비되었다면 Start를 눌러 주세요.'}</span>
        </div>
        <div className="controls">
          <button className="button primary" type="button" onClick={handleStart}><span aria-hidden="true">▶</span> Start</button>
          <button className="button secondary" type="button" onClick={handlePause}><span aria-hidden="true">Ⅱ</span> Pause</button>
          <button className="button neutral" type="button" onClick={handleReset}><span aria-hidden="true">↺</span> Reset</button>
          <button className="button neutral" type="button" onClick={handleLap}><span aria-hidden="true">⚑</span> Lap</button>
        </div>
        <div className="timer-bottom"><span aria-hidden="true">◷</span> 작은 순간도 놓치지 않도록, 0.1초 단위로 기록해요.</div>
      </section>

      <section className="goal-card card" aria-labelledby="goal-heading">
        <span className="section-icon" aria-hidden="true">◎</span>
        <h2 id="goal-heading">오늘의 작은 목표</h2>
        <p className="section-description">얼마나 집중해 볼까요?<br />도착하면 타이머가 잠시 멈춰요.</p>
        <label htmlFor="target-time">목표 시간</label>
        <div className="input-wrap"><input id="target-time" type="number" min="0.1" step="0.1" value={targetTime} onChange={handleTargetChange} placeholder="예: 60.0" aria-describedby="target-help" aria-invalid={targetTime !== '' && !hasTarget} /><span>초</span></div>
        <p id="target-help" className="input-help">비워 두면 자유롭게 기록할 수 있어요.</p>
        {targetTime !== '' && !hasTarget && <p className="validation" role="alert"><span aria-hidden="true">ⓘ</span> 0보다 큰 숫자를 입력해 주세요.</p>}
        <div className="progress-label"><span>목표까지</span><strong>{Math.floor(progress)}%</strong></div>
        <div className="progress-track" role="progressbar" aria-label="목표 시간 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(progress)}><div style={{ width: `${progress}%` }} /></div>
        {targetReached ? <div className="achievement" role="alert"><span aria-hidden="true">★</span><div><strong>목표 시간 도달</strong><span>정한 시간만큼 집중했어요!</span></div></div> : <div className="goal-note"><span aria-hidden="true">✓</span><span>큰 목표도 작은 시작부터.<br />부담 없는 시간으로 시작해 보세요.</span></div>}
      </section>

      <section className="lap-card card" aria-labelledby="lap-heading">
        <div className="card-top"><div className="lap-title"><span className="lap-icon" aria-hidden="true">⚑</span><h2 id="lap-heading">나의 Lap 기록</h2><span className="count-badge">{laps.length}개</span></div><span className="lap-subtitle">집중의 순간을 차곡차곡</span></div>
        {laps.length === 0 ? <div className="empty-laps"><span className="empty-symbol" aria-hidden="true">⚑</span><div><h3>첫 번째 순간을 남겨 보세요.</h3><p>Lap 버튼을 누르면 지금의 시간이 여기에 기록돼요.</p></div></div> : (
          <ol className="lap-list">{laps.map((lap, index) => <li key={index}><span className="lap-number">{String(index + 1).padStart(2, '0')}</span><span>Lap {index + 1}</span><strong>{lap.toFixed(1)}<span> 초</span></strong></li>)}</ol>
        )}
      </section>
    </div>
  );
}

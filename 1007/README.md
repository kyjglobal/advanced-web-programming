# Step 5: Timer 조건부 표시와 Lifecycle

React와 JSX, Vite로 구성한 프로젝트입니다.

## 실행

```sh
npm run dev
```

터미널에 표시된 로컬 주소를 브라우저에서 엽니다.
패키지를 새로 설치해야 하는 환경에서는 먼저 npm install을 실행합니다.

## 빌드

```sh
npm run build
```

## 동작

- 초기 화면: 현재 시간: 0초, Paused
- Start 클릭: Running으로 전환하고 1초마다 seconds를 1 증가
- Pause 클릭: Paused로 전환하고 기존 인터벌 정리
- 다시 Start 클릭: 멈춘 값부터 증가
- 실행 중 Start를 반복 클릭해도 인터벌이 추가되지 않음
- 컴포넌트 제거 시에도 Cleanup Function에서 clearInterval 호출

## 의존성 배열

useEffect의 의존성 배열은 [isRunning]입니다. 실행 여부가 바뀔 때 기존 인터벌을 정리하고, 실행 상태라면 새 인터벌을 만듭니다.
setSeconds(prev => prev + 1)로 최신 이전 상태를 사용하므로 Effect 안에서 seconds를 직접 읽지 않습니다. 따라서 seconds를 의존성에 넣을 필요가 없으며 매초 인터벌을 다시 만들지도 않습니다.

src/Timer.jsx에 State, Re-render, Functional Update와 Cleanup에 대한 설명 주석이 있습니다.

## Reset과 State 역할

- seconds: 화면에 표시하는 경과 시간(초)
- isRunning: 인터벌 실행 여부
- Reset은 handleReset에서 setSeconds(0)만 호출합니다.
- Running 중 Reset하면 0으로 돌아간 뒤 기존 인터벌의 다음 tick부터 증가합니다.
- Paused 중 Reset하면 0에서 멈춘 상태를 유지합니다.

Reset은 사용자의 버튼 클릭에 대한 반응이므로 Event Handler에서 처리합니다. useEffect는 실행 상태와 인터벌을 동기화하기 위한 것입니다. Reset을 Effect에 넣으면 클릭과 무관한 의존성 변경에도 시간이 초기화될 수 있습니다.

## Lifecycle 관찰

- 별도의 useEffect(..., [])에서 Timer Mounted를 출력합니다.
- 이 Effect의 Cleanup Function에서 Timer Unmounted를 출력합니다.
- 빈 의존성 배열이므로 seconds/isRunning 변경에는 다시 실행되지 않습니다.
- 기존 useEffect(..., [isRunning])는 인터벌의 시작과 정리만 담당합니다.
- 개발자 도구(F12)의 Console 탭에서 로그를 확인할 수 있습니다.
- 개발 환경의 StrictMode에서는 Effect 검증을 위한 추가 setup/cleanup 때문에 최초에 Mounted → Unmounted → Mounted 로그가 보일 수 있습니다. 이때의 cleanup은 실제 화면 제거를 뜻하지 않습니다.
- Pause는 컴포넌트를 Unmount하지 않으며 인터벌만 정리합니다.


## Timer 표시 / 숨기기

App.jsx의 showTimer State는 초기값이 true입니다. 버튼을 누르면 true/false가 전환되며, showTimer === true일 때만 <Timer />를 렌더링합니다.

- Timer 숨기기: React 트리에서 Timer가 제거되어 Unmount됩니다. 생명주기 로그가 출력되며 실행 중인 인터벌도 기존 Cleanup의 clearInterval로 정리됩니다.
- Timer 표시: 새 Timer가 Mount됩니다. State가 새로 생성되므로 0초, Paused로 시작합니다.
- Conditional Rendering은 컴포넌트의 존재 여부를 결정하므로 Mount/Unmount와 연결됩니다. CSS로 화면만 가리는 방식과 다릅니다.
- 개발 환경의 StrictMode에서는 Mount 시 Effect 검증을 위한 추가 setup/cleanup 로그가 출력될 수 있습니다.

확인 순서: Start → 시간이 증가하는지 확인 → Timer 숨기기 → Console의 Timer Unmounted 확인 → Timer 표시 → Timer Mounted와 0초/Paused 확인.

## 추가 기능

Lap 기록, 목표 시간 알림 및 자동 Pause, 0.1초 단위 표시를 추가했습니다.
자세한 구현 원리와 확인 방법은 IMPLEMENTATION.md를 참고하세요.
이제 시간은 0.0초 형식으로 표시됩니다.

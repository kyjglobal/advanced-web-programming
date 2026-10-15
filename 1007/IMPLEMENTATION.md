# 추가 기능 구현 설명

## 1. Lap 기록

`const [laps, setLaps] = useState([])`로 숫자 배열을 관리합니다.
Lap 버튼의 handleLap에서 `setLaps(prev => [...prev, seconds])`를 실행합니다.
기존 배열을 직접 수정하지 않고 새 배열에 현재 seconds를 추가하므로 React가 변경을 반영합니다.
`laps.map(...)`으로 순서 있는 리스트를 만들고 `toFixed(1)`로 표시합니다.
Lap은 클릭 순간의 누적 시간이며 이전 Lap과의 차이가 아닙니다. 일시정지 중에도 기록할 수 있습니다.

## 2. 목표 시간 알림과 자동 Pause

입력값 targetTime은 빈 입력도 표현할 수 있도록 문자열 State입니다.
Number로 변환한 값이 유한한 양수일 때만 목표로 사용합니다. 빈 입력은 목표 없음입니다.
`targetReached = hasTarget && seconds >= targetSeconds`로 도달 여부를 계산합니다.
정확한 일치(===) 대신 >=를 사용해 목표값을 지나쳐도 감지합니다.
도달하면 조건부 렌더링으로 '목표 시간 도달'을 표시합니다.
별도의 Effect가 targetReached와 isRunning을 관찰하며 실행 중 도달하면 setIsRunning(false)를 호출합니다.
그러면 기존 인터벌 Effect의 Cleanup이 clearInterval을 호출해 타이머를 멈춥니다.
도달 여부는 기존 State에서 계산 가능하므로 별도 State로 중복 저장하지 않습니다.
현재 시간보다 작은 목표를 입력해도 도달로 처리됩니다. 계속 실행하려면 Reset하거나 목표를 늘리거나 지우면 됩니다.

## 3. 정수에서 소수점 시간으로 확장

JavaScript의 Number는 정수와 소수를 모두 표현하므로 별도 실수 타입 선언은 필요 없습니다.
인터벌 주기를 1000ms에서 100ms로 바꾸고 매번 0.1초를 더합니다.
`setSeconds(prev => Math.round((prev + 0.1) * 10) / 10)`으로 최신 이전 값을 사용하며 소수 누적 오차를 줄입니다.
`seconds.toFixed(1)`은 표시만 소수점 한 자리 문자열로 만들고 State 자체는 숫자로 유지합니다.
목표 입력도 step="0.1"로 소수를 입력할 수 있습니다. 더 세밀한 목표를 직접 입력하면 목표 이상인 첫 0.1초 tick에 멈춥니다.
이 구현은 학습용 인터벌 타이머입니다. 브라우저의 백그라운드 탭 제한이나 작업 지연으로 실제 시계와 오차가 생길 수 있습니다.

## 4. 기존 기능과 Effect 책임

- 생명주기 Effect ([]): Mount/Unmount 로그 출력
- 인터벌 Effect ([isRunning]): 인터벌 생성과 Cleanup
- 목표 Effect ([targetReached, isRunning]): 목표 도달 시 자동 Pause
- Reset 이벤트 핸들러: seconds만 0으로 변경. 실행 여부, Lap, 목표 입력 유지
- Timer 숨기기: Unmount와 인터벌 Cleanup. 다시 표시하면 모든 Timer State가 초기화됨
- StrictMode 개발 환경에서는 생명주기 검증을 위한 추가 setup/cleanup 로그가 발생할 수 있음

## 확인 방법

1. 목표를 비우고 Start: 0.1초 단위로 증가하는지 확인합니다.
2. Lap을 두 번 클릭: 각각의 누적 시간이 순서대로 남는지 확인합니다.
3. Pause: 시간이 멈추는지 확인합니다.
4. Reset 후 목표 0.5를 입력하고 Start: 0.5초에서 Paused와 목표 시간 도달이 표시되는지 확인합니다.
5. 목표를 지우고 Start 후 Reset: Running을 유지하며 0부터 다시 증가하는지 확인합니다.
6. 실행 중 Timer 숨기기 후 표시: 0.0초, Paused, 빈 Lap/목표로 시작하는지 확인합니다.

## Skylearn 디자인 적용

skylearn-DESIGN.md를 참고해 하늘색 포인트, 초록색 진행률, 노란색 목표 달성 피드백, 둥근 카드와 큰 버튼으로 화면을 구성했습니다.
데스크톱에서는 집중 시간과 목표 설정을 나란히 배치하고 모바일에서는 세로로 배치합니다.
Atkinson Hyperlegible, Hubot Sans, JetBrains Mono를 Fontsource 패키지로 포함했습니다. 한글은 시스템의 Malgun Gothic/sans-serif로 표시됩니다.
키보드 포커스, 입력 라벨, 상태 텍스트, 목표 진행률 접근성 속성과 reduced-motion 대응을 적용했습니다.
기존 State와 Effect 동작을 유지하고 목표 진행률은 현재 시간과 목표 시간에서 계산합니다.

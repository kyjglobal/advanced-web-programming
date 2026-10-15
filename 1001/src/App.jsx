import { useState } from 'react'
import './App.css'

// Props를 받는 곳: 전달받은 name, major, grade를 구조 분해 할당합니다.
function StudentCard({ name, major, grade }) {
  // useState: 각 StudentCard에 초기값 0인 독립적인 likes 상태를 만듭니다.
  const [likes, setLikes] = useState(0)
  // isLiked는 현재 사용자가 이 카드를 좋아요 했는지 저장합니다.
  const [isLiked, setIsLiked] = useState(false)
  // Props로 받은 학과와 학년을 카드에서 변경할 수 있도록 State에 저장합니다.
  const [currentMajor, setCurrentMajor] = useState(major)
  const [currentGrade, setCurrentGrade] = useState(grade)
  const [draftMajor, setDraftMajor] = useState(major)
  const [draftGrade, setDraftGrade] = useState(grade)
  const [isEditing, setIsEditing] = useState(false)

  function handleEditClick() {
    // 수정할 때 현재 표시 중인 값을 입력란의 초기값으로 사용합니다.
    setDraftMajor(currentMajor)
    setDraftGrade(currentGrade)
    setIsEditing(true)
  }

  function handleApplyClick() {
    // 적용하기를 눌렀을 때만 입력한 값을 실제 카드에 반영합니다.
    setCurrentMajor(draftMajor.trim())
    setCurrentGrade(draftGrade.trim())
    setIsEditing(false)
  }

  function handleLikeClick() {
    if (isLiked) {
      // 좋아요 취소: 현재 좋아요 수를 1 감소시키며 0보다 작아지지 않게 합니다.
      setLikes((currentLikes) => Math.max(0, currentLikes - 1))
    } else {
      // 좋아요: 현재 좋아요 수를 1 증가시킵니다.
      setLikes((currentLikes) => currentLikes + 1)
    }

    // 버튼을 누를 때마다 좋아요 여부를 반대로 변경합니다.
    setIsLiked((currentIsLiked) => !currentIsLiked)
  }

  // Re-render: 상태가 변경되면 새 숫자와 버튼 문구로 StudentCard가 다시 렌더링됩니다.
  return (
    <article className="student-card">
      {/* Props를 사용하는 곳: name은 직접 출력하고, major와 grade는 State의 초기값으로 사용합니다. */}
      <header className="card-header">
        <h2>{name}</h2>
      </header>

      {isEditing ? (
        <div className="edit-fields">
          <label>
            학과
            <input
              type="text"
              value={draftMajor}
              onChange={(event) => setDraftMajor(event.target.value)}
            />
          </label>

          <label>
            학년
            <input
              type="text"
              value={draftGrade}
              onChange={(event) => setDraftGrade(event.target.value)}
            />
          </label>

          {/* 적용하기 버튼은 수정/좋아요 버튼 위에 표시됩니다. */}
          <button
            type="button"
            className="apply-button"
            onClick={handleApplyClick}
            disabled={!draftMajor.trim() || !draftGrade.trim()}
          >
            적용하기
          </button>
        </div>
      ) : (
        <dl className="student-details">
          <div>
            <dt>학과</dt>
            <dd>{currentMajor}</dd>
          </div>
          <div>
            <dt>학년</dt>
            <dd>{currentGrade}</dd>
          </div>
        </dl>
      )}

      <div className="action-buttons">
        <button
          type="button"
          className="edit-button"
          onClick={handleEditClick}
          disabled={isEditing}
        >
          수정
        </button>
        <button
          type="button"
          className={`like-button ${isLiked ? 'is-liked' : ''}`}
          onClick={handleLikeClick}
          aria-pressed={isLiked}
        >
          {isLiked ? '좋아요 취소' : '좋아요'} {likes}
        </button>
      </div>
    </article>
  )
}

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <h1>학생 정보</h1>
        <p className="page-description">
          등록된 학생의 학과와 학년을 확인할 수 있습니다.
        </p>
      </header>

      <section className="student-list" aria-label="학생 목록">
        {/* Props를 전달하는 곳: 학생마다 서로 다른 값을 전달합니다. */}
        <StudentCard name="김용준" major="컴퓨터공학과" grade="3학년" />
        <StudentCard name="이서연" major="시각디자인학과" grade="2학년" />
        <StudentCard name="박민수" major="경영학과" grade="1학년" />
      </section>
    </main>
  )
}

export default App

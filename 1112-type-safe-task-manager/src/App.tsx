import { useState } from 'react'
import type * as React from 'react'
import TaskItem from './TaskItem'
import Calendar, { dateKey } from './Calendar'
import type { Task } from './task'
import { MAX_TITLE_LENGTH, validateTaskTitle } from './validation'
import './App.css'

type TaskFilter = 'all' | 'active' | 'completed'

function App(): React.ReactElement {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'React 컴포넌트 이해하기', completed: true, date: dateKey(new Date()) },
    { id: 2, title: 'TypeScript 인터페이스 연습하기', completed: false, date: '2026-11-11' },
    { id: 3, title: 'Task Manager 목록 만들기', completed: false, date: '2026-11-11' },
  ])
  const [selectedDate, setSelectedDate] = useState<string>(dateKey(new Date()))
  const [taskDate, setTaskDate] = useState<string>(dateKey(new Date()))
  const [input, setInput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [isDark, setIsDark] = useState<boolean>(false)

  const dateTasks: Task[] = tasks.filter((task: Task): boolean => task.date === selectedDate)
  const totalCount: number = dateTasks.length
  const completedCount: number = dateTasks.filter((task: Task): boolean => task.completed).length
  const activeCount: number = totalCount - completedCount
  const progress: number = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)
  const visibleTasks: Task[] = dateTasks.filter((task: Task): boolean => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  function selectDate(date: string): void {
    setSelectedDate(date)
    setTaskDate(date)
    setFilter('all')
    setError('')
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInput(event.target.value)
    setError('')
  }

  function addTask(title: string): void {
    const message: string = validateTaskTitle(title)
    if (message) {
      setError(message)
      return
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(taskDate) || Number.isNaN(new Date(taskDate).getTime()) || dateKey(new Date(taskDate + 'T00:00:00')) !== taskDate) {
      setError('올바른 날짜를 선택하세요.')
      return
    }
    const newTask: Task = { id: Date.now(), title: title.trim(), completed: false, date: taskDate }
    setSelectedDate(taskDate)
    setTasks((previousTasks: Task[]): Task[] => [...previousTasks, newTask])
    setInput('')
    setError('')
    setFilter('all')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    addTask(input)
  }

  function deleteTask(id: number): void {
    setTasks((previousTasks: Task[]): Task[] => [
      ...previousTasks.filter((task: Task): boolean => task.id !== id),
    ])
  }

  function toggleTask(id: number): void {
    setTasks((previousTasks: Task[]): Task[] =>
      previousTasks.map((task: Task): Task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function updateTask(id: number, title: string): boolean {
    if (validateTaskTitle(title) || !tasks.some((task: Task): boolean => task.id === id)) {
      return false
    }
    setTasks((previousTasks: Task[]): Task[] =>
      previousTasks.map((task: Task): Task =>
        task.id === id ? { ...task, title: title.trim() } : task,
      ),
    )
    return true
  }

  return (
    <div className="app" data-theme={isDark ? 'dark' : 'light'}>
      <div className="app-shell">
        <header className="app-bar">
          <div className="app-brand">
            <span className="app-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="m5 7 2 2 4-4M5 16l2 2 4-4M15 7h4M15 16h4" />
              </svg>
            </span>
            <span>Task Manager</span>
          </div>
          <button className="button button-neutral theme-button" type="button"
            aria-pressed={isDark} aria-label="다크 모드"
            onClick={(): void => setIsDark(!isDark)}>
            <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
            <span>{isDark ? '라이트 모드' : '다크 모드'}</span>
          </button>
        </header>

        <section className="viewing-area" aria-label="선택한 날짜 통계">
          <p className="eyebrow">{selectedDate.replaceAll('-', '.')} · 선택한 날짜</p>
          <div className="overview" aria-live="polite">
            <div><span>전체 할 일</span><strong>{totalCount}<small>개</small></strong></div>
            <div><span>진행 중</span><strong>{activeCount}<small>개</small></strong></div>
            <div className="overview-completed"><span>완료</span><strong>{completedCount}<small>개</small></strong></div>
          </div>
          <div className="progress-summary">
            <div><span>선택한 날짜 달성률</span><strong>{progress}%</strong></div>
            <progress value={completedCount} max={totalCount || 1} aria-label="할 일 달성률" />
          </div>
        </section>

        <main className="interaction-area">
          <div className="planning-column">
          <Calendar key={selectedDate.slice(0, 7)} tasks={tasks} selectedDate={selectedDate} onSelect={selectDate} />
          <section className="panel composer" aria-labelledby="add-title">
            <h2 id="add-title">새로운 할 일</h2>
            <form onSubmit={handleSubmit} noValidate>
              <label className="field-label" htmlFor="task-date">날짜</label>
              <input id="task-date" className="field-input date-input" type="date" value={taskDate} onInput={(event: React.FormEvent<HTMLInputElement>): void => { setTaskDate(event.currentTarget.value); setError('') }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setTaskDate(event.target.value); setError('') }} />
              <label className="field-label" htmlFor="new-task">할 일 제목</label>
              <input id="new-task" className="field-input" type="text"
                placeholder="예: React 강의 복습하기" value={input} onChange={handleChange}
                aria-invalid={error !== ''} aria-describedby="new-task-help new-task-count" />
              <div className="field-meta">
                <span id="new-task-help" className={error ? 'field-error' : ''} role={error ? 'alert' : undefined}>
                  {error || '앞뒤 공백을 제외한 1~100자로 입력하세요.'}
                </span>
                <span id="new-task-count">{input.trim().length}/{MAX_TITLE_LENGTH}</span>
              </div>
              <button type="submit" className="button button-primary add-button">
                <span aria-hidden="true">+</span> 할 일 추가
              </button>
            </form>
            <p className="composer-note">작은 일부터 시작해도 괜찮아요.</p>
          </section>

          </div>

          <section className="panel tasks-panel" aria-labelledby="list-title">
            <div className="panel-heading"><h2 id="list-title">{Number(selectedDate.slice(5, 7))}월 {Number(selectedDate.slice(8))}일 할 일</h2><span>{visibleTasks.length}개</span></div>
            <div className="filters" role="group" aria-label="할 일 필터">
              <button className="filter-button" type="button" aria-pressed={filter === 'all'} onClick={(): void => setFilter('all')}>전체</button>
              <button className="filter-button" type="button" aria-pressed={filter === 'active'} onClick={(): void => setFilter('active')}>진행 중</button>
              <button className="filter-button" type="button" aria-pressed={filter === 'completed'} onClick={(): void => setFilter('completed')}>완료</button>
            </div>
            <ul className="task-list">
              {visibleTasks.map((task: Task): React.ReactElement => (
                <TaskItem key={task.id} task={task} onDelete={deleteTask} onToggle={toggleTask} onUpdate={updateTask} />
              ))}
            </ul>
            {visibleTasks.length === 0 && (
              <div className="empty-state">
                <span aria-hidden="true">✓</span>
                <h3>{totalCount === 0 ? '새로운 시작을 기다리고 있어요' : '이 목록에는 할 일이 없어요'}</h3>
                <p>{totalCount === 0 ? '첫 번째 할 일을 추가해 보세요.' : '다른 목록을 선택하거나 새로운 할 일을 추가하세요.'}</p>
              </div>
            )}
          </section>
        </main>
        <footer className="app-footer">하나씩, 나의 속도대로.</footer>
      </div>
    </div>
  )
}

export default App



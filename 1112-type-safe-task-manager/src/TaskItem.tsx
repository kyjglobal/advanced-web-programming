import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactElement } from 'react'
import type { Task } from './task'
import { MAX_TITLE_LENGTH, validateTaskTitle } from './validation'

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onUpdate: (id: number, title: string) => boolean
}

function TaskItem({ task, onDelete, onToggle, onUpdate }: TaskItemProps): ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [draft, setDraft] = useState<string>(task.title)
  const [error, setError] = useState<string>('')

  function startEditing(): void {
    setDraft(task.title)
    setError('')
    setIsEditing(true)
  }

  function cancelEditing(): void {
    setDraft(task.title)
    setError('')
    setIsEditing(false)
  }

  function handleDraftChange(event: ChangeEvent<HTMLInputElement>): void {
    setDraft(event.target.value)
    setError('')
  }

  function saveTask(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const validationError: string = validateTaskTitle(draft)

    if (validationError !== '') {
      setError(validationError)
      return
    }

    if (!onUpdate(task.id, draft.trim())) {
      setError('Task를 수정할 수 없습니다. 다시 확인해 주세요.')
      return
    }

    setError('')
    setIsEditing(false)
  }

  return (
    <li className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={saveTask} noValidate>
          <input
            className="field-input"
            type="text"
            aria-label={`${task.title} 제목 수정`}
            aria-invalid={error !== ''}
            aria-describedby={error ? `task-edit-error-${task.id}` : undefined}
            value={draft}
            onChange={handleDraftChange}
            autoFocus
          />
          <div className="field-meta">
            <span>{draft.trim().length}/{MAX_TITLE_LENGTH}</span>
          </div>
          {error && (
            <p id={`task-edit-error-${task.id}`} className="field-error" role="alert">
              {error}
            </p>
          )}
          <div className="edit-actions">
            <button type="button" className="button button-neutral button-small" onClick={cancelEditing}>
              취소
            </button>
            <button type="submit" className="button button-primary button-small">
              저장
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-content">
            <p className="task-title">{task.title}</p>
            <span className="task-state">{task.completed ? '완료' : '진행 중'}</span>
          </div>
          <div className="task-actions">
            <label className="task-toggle">
              <input
                type="checkbox"
                aria-label={`${task.title} 완료 상태`}
                checked={task.completed}
                onChange={(): void => onToggle(task.id)}
              />
            </label>
            <button
              type="button"
              className="button button-neutral button-small"
              aria-label={`${task.title} 수정`}
              onClick={startEditing}
            >
              수정
            </button>
            <button
              type="button"
              className="button button-danger button-small"
              aria-label={`${task.title} 삭제`}
              onClick={(): void => onDelete(task.id)}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem

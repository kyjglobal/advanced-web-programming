import { useState } from 'react'
import type { ReactElement } from 'react'
import type { Task } from './task'

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

interface CalendarProps {
  tasks: Task[]
  selectedDate: string
  onSelect: (date: string) => void
}

function Calendar({ tasks, selectedDate, onSelect }: CalendarProps): ReactElement {
  const [month, setMonth] = useState<Date>(() => new Date(`${selectedDate}T00:00:00`))
  const year: number = month.getFullYear()
  const monthIndex: number = month.getMonth()
  const firstDay: number = new Date(year, monthIndex, 1).getDay()
  const days: number = new Date(year, monthIndex + 1, 0).getDate()

  function moveMonth(offset: number): void {
    setMonth(new Date(year, monthIndex + offset, 1))
  }

  return (
    <section className="panel calendar-panel" aria-label="할 일 달력">
      <div className="calendar-heading">
        <h2>{year}년 {monthIndex + 1}월</h2>
        <div className="calendar-navigation">
          <button className="button button-neutral button-small" type="button" aria-label="이전 달" onClick={(): void => moveMonth(-1)}>‹</button>
          <button className="button button-neutral button-small" type="button" aria-label="다음 달" onClick={(): void => moveMonth(1)}>›</button>
        </div>
      </div>
      <div className="calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map((day: string): ReactElement => <span className="weekday" key={day}>{day}</span>)}
        {Array.from({ length: firstDay }, (_: unknown, index: number): ReactElement => <span key={`blank-${index}`} />)}
        {Array.from({ length: days }, (_: unknown, index: number): ReactElement => {
          const day: number = index + 1
          const date: string = dateKey(new Date(year, monthIndex, day))
          const count: number = tasks.filter((task: Task): boolean => task.date === date).length
          return (
            <button className="calendar-day" type="button" key={date} aria-pressed={selectedDate === date}
              aria-current={date === dateKey(new Date()) ? 'date' : undefined}
              aria-label={`${year}년 ${monthIndex + 1}월 ${day}일, 할 일 ${count}개`}
              onClick={(): void => onSelect(date)}>
              <span>{day}</span><small>{count > 0 ? `${count}개` : '\u00a0'}</small>
            </button>
          )
        })}
      </div>
      <p className="calendar-help">날짜를 선택하면 해당 날짜의 할 일을 볼 수 있어요.</p>
    </section>
  )
}

export default Calendar

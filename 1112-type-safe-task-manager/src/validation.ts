export const MAX_TITLE_LENGTH: number = 100

// 추가와 수정에 동일한 규칙을 적용합니다. 오류가 없으면 ''를 반환합니다.
export function validateTaskTitle(title: string): string {
  const trimmedTitle: string = title.trim()
  if (trimmedTitle.length === 0) return '할 일 제목을 입력하세요. 공백만 입력할 수 없어요.'
  if (trimmedTitle.length > MAX_TITLE_LENGTH) return '할 일 제목은 100자 이내로 입력하세요.'
  return ''
}

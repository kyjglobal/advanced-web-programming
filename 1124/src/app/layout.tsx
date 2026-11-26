import type { ReactNode } from 'react'
import './board.css'
export default function Layout({children}: {children: ReactNode}) {
  return <html lang="ko"><body>{children}</body></html>
}

import Link from "next/link";
import type { ReactNode } from "react";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="board-shell">
      <header className="board-header">
        <p>익명 게시판</p>
        <nav aria-label="게시판 메뉴">
          <Link href="/posts">게시글 목록</Link>
          <Link href="/posts/new" className="board-primary">글쓰기</Link>
        </nav>
      </header>

      <main className="board-panel">{children}</main>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function PostsError({ reset }: { reset: () => void }) {
  return (
    <>
      <h1>게시글을 불러오지 못했습니다</h1>
      <button type="button" onClick={reset}>다시 시도</button>
      {" "}
      <Link href="/posts">목록으로</Link>
    </>
  );
}
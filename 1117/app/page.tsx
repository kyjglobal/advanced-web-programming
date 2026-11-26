import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">라우팅 학습 예제</h1>
      <p>Next.js App Router로 페이지 이동을 연습하는 홈 페이지입니다.</p>
      <nav aria-label="주요 페이지" className="flex gap-6">
        <Link href="/about" className="text-blue-600 underline underline-offset-4">소개 페이지</Link>
        <Link href="/students" className="text-blue-600 underline underline-offset-4">학생 목록</Link>
      </nav>
    </main>
  );
}

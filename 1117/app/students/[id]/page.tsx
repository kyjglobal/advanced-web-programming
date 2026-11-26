import Link from "next/link";
import { notFound } from "next/navigation";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 동적 경로 [id]의 값을 읽습니다.
  const { id } = await params;

  if (!["1", "2", "3"].includes(id)) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">학생 {id}</h1>
      <p>학생 {id}의 상세 페이지입니다.</p>
      <nav aria-label="돌아가기" className="flex gap-6">
        <Link href="/students" className="text-blue-600 underline underline-offset-4">학생 목록으로 이동</Link>
        <Link href="/" className="text-blue-600 underline underline-offset-4">홈으로 이동</Link>
      </nav>
    </main>
  );
}

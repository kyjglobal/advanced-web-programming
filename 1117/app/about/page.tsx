import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">소개</h1>
      <p>폴더 구조로 경로를 만들고 Link 컴포넌트로 페이지를 이동하는 학습 예제입니다.</p>
      <Link href="/" className="text-blue-600 underline underline-offset-4">홈으로 이동</Link>
    </main>
  );
}

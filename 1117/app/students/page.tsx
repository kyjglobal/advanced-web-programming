import Link from "next/link";

export default function StudentsPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">학생 목록</h1>
      <ul className="list-disc space-y-3 pl-6">
        {[1, 2, 3].map((id) => (
          <li key={id}>
            <Link href={`/students/${id}`} className="text-blue-600 underline underline-offset-4">학생 {id}</Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="text-blue-600 underline underline-offset-4">홈으로 이동</Link>
    </main>
  );
}

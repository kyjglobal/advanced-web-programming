import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/src/services/postApi";
import { DeletePostButton } from "./DeletePostButton";

export const dynamic = "force-dynamic";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({
  params,
}: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <p className="board-meta">
          작성자 {post.author} ·{" "}
          <time dateTime={post.createdAt}>
            {post.createdAt.slice(0, 10)}
          </time>{" "}
          · 조회수 {post.views}
        </p>
        <p className="board-content">{post.content}</p>
      </article>

      <div className="board-actions">
        <Link href={`/posts/${post.id}/edit`}>수정</Link>
        <DeletePostButton id={post.id} />
        <Link href="/posts">목록으로</Link>
      </div>
    </>
  );
}
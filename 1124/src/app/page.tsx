import Link from "next/link";
import { getPosts } from "@/src/services/postApi";
import type { PostSummary } from "@/src/types/post";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  let posts: PostSummary[];

  try {
    ({ posts } = await getPosts());
  } catch (error) {
    console.error("게시글 목록 조회 실패", error);

    return (
      <>
        <h1>게시글 목록</h1>
        <p role="alert">게시글 목록을 불러오지 못했습니다.</p>
      </>
    );
  }

  return (
    <>
      <h1>게시글 목록</h1>

      {posts.length === 0 ? (
        <p>아직 작성된 게시글이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
              <th scope="col">조회수</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link href={`/posts/${post.id}`} prefetch={false}>
                    {post.title}
                  </Link>
                </td>
                <td>{post.author}</td>
                <td>
                  <time dateTime={post.createdAt}>
                    {post.createdAt.slice(0, 10)}
                  </time>
                </td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
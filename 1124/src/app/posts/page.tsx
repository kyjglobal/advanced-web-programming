import Link from "next/link";
import { redirect } from "next/navigation";
import { getPosts } from "@/src/services/postApi";

export const dynamic = "force-dynamic";

const pageSize = 10;

type PostsPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
  }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page =
    Number.isSafeInteger(requestedPage * pageSize) &&
    Number.isInteger(requestedPage) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  function pageHref(nextPage: number) {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    query.set("page", String(nextPage));
    return `/posts?${query.toString()}`;
  }

  const { posts, total } = await getPosts({ q, page, size: pageSize });
  const lastPage = Math.max(1, Math.ceil(total / pageSize));

  if (page > lastPage) redirect(pageHref(lastPage));

  return (
    <>
      <h1>게시글 목록</h1>

      <form className="board-search" action="/posts" method="get" key={q}>
        <label htmlFor="q">제목 검색</label>{" "}
        <input id="q" name="q" type="search" defaultValue={q} />
        {" "}
        <button type="submit">검색</button>
        {q && <>{" "}<Link href="/posts">검색 초기화</Link></>}
      </form>

      {posts.length === 0 ? (
        <p className="board-empty">{q ? "검색 결과가 없습니다." : "아직 작성된 게시글이 없습니다."}</p>
      ) : (
        <div className="board-table" role="region" aria-label="게시글 목록 표" tabIndex={0}>
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
        </div>
      )}

      {lastPage > 1 && (
        <nav className="board-pagination" aria-label="게시글 페이지">
          {page > 1 && <Link href={pageHref(page - 1)}>이전</Link>}
          {" "}{page} / {lastPage}{" "}
          {page < lastPage && <Link href={pageHref(page + 1)}>다음</Link>}
        </nav>
      )}
    </>
  );
}
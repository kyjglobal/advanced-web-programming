import type {
  ApiErrorResponse,
  CreatePostRequest,
  CreatePostResponse,
  PostDetail,
  PostListResponse,
} from "@/src/types/post";

function serverApiUrl(path: string) {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error(".env.local에 API_BASE_URL을 설정하세요.");
  }

  return new URL(path, baseUrl);
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | Partial<ApiErrorResponse>
      | null;

    throw new Error(body?.message || `요청에 실패했습니다 (${response.status}).`);
  }

  return (await response.json()) as T;
}

export async function getPosts({
  q = "",
  page = 1,
  size = 10,
} = {}): Promise<PostListResponse> {
  const url = serverApiUrl("/api/posts");
  if (q) url.searchParams.set("q", q);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));

  const response = await fetch(url, { cache: "no-store" });
  return readJson<PostListResponse>(response);
}

export async function getPost(
  id: string,
  { countView = true } = {},
): Promise<PostDetail | null> {
  const url = serverApiUrl(`/api/posts/${encodeURIComponent(id)}`);
  if (!countView) url.searchParams.set("view", "0");

  const response = await fetch(url, { cache: "no-store" });
  if (response.status === 404) return null;

  return readJson<PostDetail>(response);
}

export async function updatePost(
  id: number,
  input: CreatePostRequest,
  editToken: string,
): Promise<PostDetail> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${editToken}`,
    },
    body: JSON.stringify(input),
  });

  return readJson<PostDetail>(response);
}

export async function deletePost(
  id: number,
  editToken: string,
): Promise<void> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${editToken}` },
  });

  if (!response.ok) {
    await readJson(response);
  }
}

export async function createPost(
  input: CreatePostRequest,
): Promise<CreatePostResponse> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return readJson<CreatePostResponse>(response);
}
export type PostSummary = {
  id: number;
  title: string;
  author: "익명";
  createdAt: string;
  views: number;
};

export type PostDetail = PostSummary & {
  content: string;
};

export type PostListResponse = {
  posts: PostSummary[];
  total: number;
  page: number;
  size: number;
};

export type CreatePostRequest = {
  title: string;
  content: string;
};

export type CreatePostResponse = {
  post: PostDetail;
  editToken: string;
};

export type ApiErrorResponse = {
  message: string;
};
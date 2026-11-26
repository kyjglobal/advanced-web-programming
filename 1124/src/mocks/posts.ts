export type MockPost = {
  id: number;
  title: string;
  content: string;
  author: "익명";
  createdAt: string;
  views: number;
};

export const mockPosts: MockPost[] = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "안녕하세요. 익명 게시판에 남기는 첫 글입니다.",
    author: "익명",
    createdAt: "2026-11-24",
    views: 3,
  },
  {
    id: 2,
    title: "Next.js 실습 질문",
    content: "목록에서 글 제목을 누르면 상세 페이지로 이동하나요?",
    author: "익명",
    createdAt: "2026-11-23",
    views: 7,
  },
];
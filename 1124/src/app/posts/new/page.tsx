"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createPost } from "@/src/services/postApi";

export default function NewPostPage() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedPostId, setSavedPostId] = useState<number | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const content = String(form.get("content") ?? "").trim();

    if (title.length < 1 || title.length > 100) {
      setMessage("제목은 1~100자로 입력하세요.");
      return;
    }

    if (content.length < 1 || content.length > 5000) {
      setMessage("본문은 1~5000자로 입력하세요.");
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    try {
      const { post, editToken } = await createPost({ title, content });

      try {
        localStorage.setItem(`post-edit-token:${post.id}`, editToken);
      } catch {
        setSavedPostId(post.id);
        return;
      }

      window.location.replace(`/posts/${post.id}`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "게시글을 등록하지 못했습니다.",
      );
      setIsSubmitting(false);
    }
  }

  if (savedPostId !== null) {
    return (
      <>
        <h1>글쓰기</h1>
        <p role="alert">
          글은 등록됐지만 브라우저에 수정·삭제용 토큰을 저장하지 못했습니다.
        </p>
        <Link href={`/posts/${savedPostId}`} prefetch={false}>
          등록한 글 보기
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>글쓰기</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">제목</label>
          <br />
          <input id="title" name="title" required maxLength={100} />
        </p>

        <p>
          <label htmlFor="content">본문</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            maxLength={5000}
            rows={6}
          />
        </p>

        {message && <p role="alert">{message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중…" : "등록"}
        </button>
        {" "}
        <Link href="/posts">취소</Link>
      </form>
    </>
  );
}
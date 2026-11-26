"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { updatePost } from "@/src/services/postApi";
import type { PostDetail } from "@/src/types/post";

export function EditPostForm({ post }: { post: PostDetail }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const content = String(form.get("content") ?? "").trim();

    if (!title || title.length > 100 || !content || content.length > 5000) {
      setMessage("제목은 1~100자, 본문은 1~5000자로 입력하세요.");
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem(`post-edit-token:${post.id}`);
      if (!token) {
        throw new Error("이 브라우저에 이 글의 관리 토큰이 없습니다.");
      }

      await updatePost(post.id, { title, content }, token);
      window.location.replace(`/posts/${post.id}`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "게시글을 수정하지 못했습니다.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">제목</label>
        <br />
        <input
          id="title"
          name="title"
          defaultValue={post.title}
          required
          maxLength={100}
        />
      </p>

      <p>
        <label htmlFor="content">본문</label>
        <br />
        <textarea
          id="content"
          name="content"
          defaultValue={post.content}
          required
          maxLength={5000}
          rows={6}
        />
      </p>

      {message && <p role="alert">{message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "저장 중…" : "수정 저장"}
      </button>
      {" "}
      <Link href={`/posts/${post.id}`} prefetch={false}>취소</Link>
    </form>
  );
}
"use client";

import { useState } from "react";
import { deletePost } from "@/src/services/postApi";

export function DeletePostButton({ id }: { id: number }) {
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;

    setMessage("");

    try {
      const token = localStorage.getItem(`post-edit-token:${id}`);
      if (!token) {
        throw new Error("이 브라우저에 이 글의 관리 토큰이 없습니다.");
      }

      if (!window.confirm("이 게시글을 삭제할까요?")) return;

      setIsDeleting(true);
      await deletePost(id, token);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "게시글을 삭제하지 못했습니다.",
      );
      setIsDeleting(false);
      return;
    }

    try {
      localStorage.removeItem(`post-edit-token:${id}`);
    } finally {
      window.location.replace("/posts");
    }
  }

  return (
    <>
      <button className="board-danger" type="button" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "삭제 중…" : "삭제"}
      </button>
      {message && <p role="alert">{message}</p>}
    </>
  );
}
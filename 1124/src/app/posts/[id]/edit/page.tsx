import { notFound } from "next/navigation";
import { getPost } from "@/src/services/postApi";
import { EditPostForm } from "./EditPostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id, { countView: false });

  if (!post) notFound();

  return (
    <>
      <h1>게시글 수정</h1>
      <EditPostForm post={post} />
    </>
  );
}
import { Suspense } from "react";
import SessionDetailClient from "./SessionDetailClient";

export default async function SessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionDetailClient sessionId={id} />
    </Suspense>
  );
} 
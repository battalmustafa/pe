import { Suspense } from "react";
import WorkshopDetailClient from "./WorkshopDetailClient";

export default async function WorkshopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkshopDetailClient workshopId={id} />
    </Suspense>
  );
} 
import { redirect } from 'next/navigation';

export default async function EventRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/workshops/${id}`);
} 
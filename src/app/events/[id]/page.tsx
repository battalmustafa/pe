import { redirect } from 'next/navigation';

export default function EventRedirect({ params }: { params: { id: string } }) {
  redirect(`/workshops/${params.id}`);
} 
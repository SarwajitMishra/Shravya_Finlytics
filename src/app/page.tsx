import { redirect } from 'next/navigation';

export default function RootPage() {
  // For now, we'll just redirect to the dashboard.
  // In the future, this could be a landing page or check for authentication.
  redirect('/dashboard');
}

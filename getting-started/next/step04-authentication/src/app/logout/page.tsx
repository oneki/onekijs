'use client';

import { useLogout } from 'onekijs-next';

export default function LogoutPage() {
  const [error, loading] = useLogout();

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (loading) return <div>Logging out ...</div>;
  return null;
}

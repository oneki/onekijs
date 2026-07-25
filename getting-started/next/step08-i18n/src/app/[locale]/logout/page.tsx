'use client';

import { useRouter } from 'next/navigation';
import { useLogout, useTranslation } from 'onekijs-next';
import { useCallback } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const [T, , locale] = useTranslation();
  const onSuccess = useCallback(() => router.replace(`/${locale}`), [locale, router]);
  const [error, loading] = useLogout({
    onSuccess,
  });

  if (error) return <div><T>Error</T>: {JSON.stringify(error)}</div>;
  if (loading) return <div><T>Logging out</T> ...</div>;
  return null;
}

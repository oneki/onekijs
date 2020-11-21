import { useLocale, useRouter } from 'onekijs-next';
import { useEffect } from 'react';

const IndexPage = () => {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [locale, router]);

  return null;
};

export default IndexPage;

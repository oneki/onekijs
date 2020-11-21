import { useLocale, useRouter, withLayout } from 'onekijs-next';
import { useEffect } from 'react';
import SiteLayout from '../layout/siteLayout';

const IndexPage = () => {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [locale]);

  return null;
};

export default withLayout(IndexPage, SiteLayout);

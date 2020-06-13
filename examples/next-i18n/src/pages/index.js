import { useLocale, useOnekiRouter, withLayout } from 'onekijs-next';
import { useEffect } from 'react';
import SiteLayout from '../layout/siteLayout';

const IndexPage = () => {
  const locale = useLocale();
  const router = useOnekiRouter();

  useEffect(() => {
    router.push("/");
  }, [locale])

  return null;
}

export default withLayout(IndexPage, SiteLayout);

import { useLocale, useOnekiRouter } from 'onekijs-next';
import { useEffect } from 'react';

const IndexPage = () => {
  const locale = useLocale();
  const router = useOnekiRouter();

  useEffect(() => {
    router.push("/");
  }, [locale])

  return null;
}

export default IndexPage;
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

const NotFoundPage: FC = () => {
  const router = useRouter();
  const [showErrorComponenent, setShowErrorComponent] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem('onekijs.notfound') === null) {
      sessionStorage.setItem('onekijs.notfound', 'true');
      router.push(router.asPath);
    } else {
      sessionStorage.removeItem('onekijs.notfound');
      setShowErrorComponent(true);
    }
  }, [router]);

  if (showErrorComponenent) return <div>Page not found</div>;
  return null;
};

export default NotFoundPage;

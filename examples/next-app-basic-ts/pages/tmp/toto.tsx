import { useRouter } from 'next/router';
import React, { FC } from 'react';

const TotoPage: FC = () => {
  const router = useRouter();
  console.log(router);
  return <pre>{JSON.stringify(router, null, 2)}</pre>;
};
export default TotoPage;

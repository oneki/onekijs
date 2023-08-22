import { Link, useLocation } from 'onekijs';
import { FC } from 'react';

const IndexPage: FC = () => {
  const location = useLocation();
  const basePath = location.pathname;
  return (
    <div>
      <ul>
        <li><Link href={`${basePath}/secure`}>Secure page (accessible to all authenticated users)</Link></li>
        <li><Link href={`${basePath}/ultra-secure`}>Ultra-secure page (accessible only to users with "admin" role)</Link></li>
      </ul>
    </div>
  );
}

export default IndexPage;

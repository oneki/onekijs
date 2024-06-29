import { Link, useLocation, useSetting } from 'onekijs';
import { FC } from 'react';

const UiPage: FC = () => {
  const location = useLocation();
  const basePath = location.pathname;
  return (
    <div>
      <h2>FormInput</h2>
      <ul>
        <li><Link href={`${basePath}/FormInput/basic`}>Basic</Link></li>
        <li><Link href={`${basePath}/FormInput/help`}>Help</Link></li>
      </ul>
    </div>
  );
}

export default UiPage;

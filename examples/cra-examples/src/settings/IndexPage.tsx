import { Link, useLocation, useSetting } from 'onekijs';
import { FC } from 'react';

const SettingsIndexPage: FC = () => {
  const location = useLocation();
  const basePath = location.pathname;
  return (
    <div>
      <ul>
        <li><Link href={`${basePath}/use-settings`}>useSettings example</Link></li>
        <li><Link href={`${basePath}/use-setting`}>useSetting example</Link></li>
      </ul>
    </div>
  );
}

export default SettingsIndexPage;
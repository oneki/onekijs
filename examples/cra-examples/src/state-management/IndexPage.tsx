import { Link, useLocation, useSetting } from 'onekijs';
import { FC } from 'react';

const StateManagementIndexPage: FC = () => {
  const location = useLocation();
  const basePath = location.pathname;
  return (
    <div>
      <ul>
        <li><Link href={`${basePath}/use-global-state`}>useGlobalState example</Link></li>
        <li><Link href={`${basePath}/use-global-prop`}>useGlobalProp example</Link></li>
        <li><Link href={`${basePath}/use-local-service`}>useLocalService example</Link></li>
      </ul>
    </div>
  );
}

export default StateManagementIndexPage;
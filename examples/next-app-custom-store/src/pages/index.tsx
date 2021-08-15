import { Link, useGlobalProp, useGlobalService } from 'onekijs-next';
import React, { FC } from 'react';
import LoadingService from '../modules/core/LoadingService';

const IndexPage: FC = () => {
  const service = useGlobalService(LoadingService);
  const loading = useGlobalProp('loading');
  return (
    <div>
      <div>
        This is very basic example. Check the files
        <ul>
          <li>
            <b>package.json</b>: to see the dependencies
          </li>
          <li>
            <b>_app.js</b>: to find how the application is bootstrapped
          </li>
        </ul>
      </div>
      <div>
        This simple example bootstraps:
        <ul>
          <li>
            <b>A router</b>: Go to <Link href="/users">Users</Link>
          </li>
          <li>
            <b>A custom Redux store</b>
          </li>
          <li>
            <b>A global service</b>
          </li>
        </ul>
        <button onClick={() => service.load(1000)}>{loading ? 'Loading ...' : 'Click me'}</button>
      </div>
    </div>
  );
};

export default IndexPage;

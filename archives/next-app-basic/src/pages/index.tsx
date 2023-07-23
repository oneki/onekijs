import { Link } from 'onekijs-next';
import React, { FC } from 'react';

const IndexPage: FC = () => {
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
            <b>A Redux store</b>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;

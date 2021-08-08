import React, { FC } from 'react';
import { Link } from 'onekijs-next';

const UsersPage: FC = () => {
  return (
    <div>
      This is the users page. Go to <Link href="/">Index page</Link>
    </div>
  );
};

UsersPage.displayName = 'UsersPage';

export default UsersPage;

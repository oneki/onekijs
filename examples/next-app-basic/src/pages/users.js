import React from 'react';
import Link from "next/link";

const UsersPage = () => {
  return (
    <div>
      This is the users page. Go to <Link href="/">Index page</Link>
    </div>
  );
}

UsersPage.displayName = "UsersPage";

export default UsersPage;
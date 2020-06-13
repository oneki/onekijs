import React from "react";
import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
      <div>This is very basic example. Check the files
        <ul>
          <li><b>package.json</b>: to see the dependencies</li>
          <li><b>_app.js</b>: to find how the application is bootstrapped</li>
        </ul>
      </div>
      <div>
        This simple example bootstraps:
        <ul>
          <li><b>A router</b>: Go to <Link href="/users"><a>Users page</a></Link></li>
          <li><b>A Redux store</b></li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;

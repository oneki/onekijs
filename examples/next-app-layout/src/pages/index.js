import { withLayout } from 'onekijs-next';
import React from 'react';
import SiteLayout from '../layout/siteLayout';

const IndexPage = () => {
  return (
    <div>
      <p>This example shows how to use a common layout in several pages.</p>
      <p>Please note that the layout is not unmount/mount during a transition between pages, so it keeps its state</p>
    </div>
  );
};

export default withLayout(IndexPage, SiteLayout);

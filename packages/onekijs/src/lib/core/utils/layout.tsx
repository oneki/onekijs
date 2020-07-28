import React, { ElementType, ReactNode } from 'react';

/**
 * Inspired by this excellent article:
 * https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
 *
 */
export const layout = (Layout: ElementType, ParentLayout: ElementType): React.ElementType<any> => {
  const getLayout = (page: ReactNode) => {
    if (ParentLayout) {
      return (ParentLayout as any).getLayout(<Layout>{page}</Layout>);
    } else {
      return <Layout>{page}</Layout>;
    }
  };
  (Layout as any).getLayout = getLayout;
  return Layout;
};

export const withLayout = (Page: ElementType, Layout: ElementType): React.ElementType<any> => {
  if (Page && Layout) {
    (Page as any).getLayout = (Layout as any).getLayout;
  }
  return Page;
};

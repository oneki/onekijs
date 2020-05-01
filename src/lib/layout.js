import React from 'react'

/**
 * Inspired by this excellent article:
 * https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
 * 
 */
export const layout = (Layout, ParentLayout) => {
  const getLayout = (page) => {
    if (ParentLayout) {
      return ParentLayout.getLayout(<Layout>{page}</Layout>)
    } else {
      return <Layout>{page}</Layout>
    }
  }
  Layout.getLayout = getLayout;
  return Layout;
}

export const withLayout = (Page, Layout) => {
  Page.getLayout = Layout.getLayout;
  return Page;
}

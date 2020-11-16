import { LinkProps } from 'onekijs-core';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { toUrl } from 'onekijs-core';

const Link: FC<LinkProps> = ({ href, replace, scroll, prefetch, locale, shallow, children, ...anchorProps }) => {
  if (typeof href !== 'string') {
    href = toUrl(href);
  }
  return (
    <NextLink href={href} passHref>
      <a {...anchorProps}>{children}</a>
    </NextLink>
  );
};

export default Link;

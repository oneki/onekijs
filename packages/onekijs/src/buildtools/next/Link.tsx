import NextLink from 'next/link';
import React, { FC } from 'react';
import { toRelativeUrl } from '../../router/utils';
import { LinkProps } from '../../types/router';

const Link: FC<LinkProps> = ({
  href,
  replace,
  scroll,
  prefetch,
  locale,
  shallow,
  children,
  Component,
  isActive,
  activeClassName,
  activeStyle,
  ...anchorProps
}) => {
  if (typeof href !== 'string') {
    href = toRelativeUrl(href);
  }

  return (
    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      locale={locale}
      shallow={shallow}
      passHref
    >
      <a {...anchorProps}>{children}</a>
    </NextLink>
  );
};

Link.displayName = 'Link';

export default Link;

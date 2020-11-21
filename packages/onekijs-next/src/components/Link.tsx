import NextLink from 'next/link';
import { LinkProps, toI18nLocation, toRelativeUrl, toUrl, useI18n, useLocation, useSettings } from 'onekijs-core';
import React, { FC } from 'react';

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
  const location = useLocation();
  const settings = useSettings();
  const i18n = useI18n();
  const nextLocation = toI18nLocation(href, settings, i18n, locale);
  if (nextLocation.baseurl !== location.baseurl) {
    return (
      <a {...anchorProps} href={toUrl(nextLocation)}>
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={toRelativeUrl(nextLocation)}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      locale={false}
      shallow={shallow}
      passHref
    >
      <a {...anchorProps}>{children}</a>
    </NextLink>
  );
};

Link.displayName = 'Link';

export default Link;

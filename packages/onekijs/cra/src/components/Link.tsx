import { LinkProps, toI18nLocation, toRelativeUrl, toUrl, useI18n, useLocation, useSettings } from 'onekijs';
import React from 'react';
import { Link as ReactRouterLink, NavLink } from 'react-router-dom';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
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
    },
    ref,
  ) => {
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

    const LinkComponent = isActive || activeClassName || activeStyle ? NavLink : ReactRouterLink;

    return (
      <LinkComponent
        {...anchorProps}
        activeClassName={activeClassName}
        activeStyle={activeStyle}
        component={Component}
        to={toRelativeUrl(nextLocation)}
        ref={ref}
      >
        {children}
      </LinkComponent>
    );
  },
);

Link.displayName = 'Link';

export default Link;

/*    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
    isActive?: (location: Location) => boolean;*/
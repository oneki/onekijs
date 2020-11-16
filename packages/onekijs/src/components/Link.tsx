import { LinkProps, toRelativeUrl } from 'onekijs-core';
import React from 'react';
import { Link as ReactRouterLink, NavLink } from 'react-router-dom';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, replace, scroll, prefetch, locale, shallow, children, Component, isActive, ...anchorProps }, ref) => {
    if (typeof href !== 'string') {
      href = toRelativeUrl(href);
    }
    const LinkComponent =
      isActive || anchorProps.activeClassName || anchorProps.activeStyle ? NavLink : ReactRouterLink;

    return (
      <LinkComponent {...anchorProps} component={Component} to={href} ref={ref}>
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

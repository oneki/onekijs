import { LinkProps, toI18nLocation, toRelativeUrl, toUrl, useI18n, useLocation, useSettings } from 'onekijs-framework';
import React, { ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from 'react';
import { Link as ReactRouterLink, NavLink } from 'react-router-dom';

const Link: ForwardRefExoticComponent<PropsWithoutRef<LinkProps> & RefAttributes<HTMLAnchorElement>> = React.forwardRef<HTMLAnchorElement, LinkProps>(
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
      state,
      ...anchorProps
    },
    ref,
  ) => {
    const location = useLocation();
    const settings = useSettings();
    const i18n = useI18n();
    const nextLocation = toI18nLocation(href, settings, i18n, locale);
    if (state) {
      nextLocation.state = state;
    }
    if (nextLocation.baseurl !== location.baseurl) {
      return (
        <a {...anchorProps} href={toUrl(nextLocation)}>
          {children}
        </a>
      );
    }

    if (isActive || activeClassName || activeStyle) {
      const className = (props: { isActive: boolean }) =>
        isActive || props.isActive ? activeClassName || anchorProps.className : anchorProps.className;
      const style = (props: { isActive: boolean }) =>
        isActive || props.isActive ? activeStyle || {} : anchorProps.style || {};
      return (
        <NavLink {...anchorProps} className={className} style={style} to={toRelativeUrl(nextLocation)} ref={ref}>
          {children as ReactNode}
        </NavLink>
      );
    } else {
      return (
        <ReactRouterLink {...anchorProps} to={toRelativeUrl(nextLocation)} ref={ref}>
          {children}
        </ReactRouterLink>
      );
    }
  },
);

Link.displayName = 'Link';

export default Link;

/*    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
    isActive?: (location: Location) => boolean;*/

import React, { MutableRefObject } from 'react';
import { AppSettings } from './app';
import { I18n } from './i18n';
import { AnonymousObject } from './object';

// export type LinkComponentProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
// export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
//   RouterPushOptions & {
//     href: string | Location;
//     replace?: boolean;
//     scroll?: boolean;
//     prefetch?: boolean;
//     activeClassName?: string;
//     activeStyle?: React.CSSProperties;
//     exact?: boolean;
//     strict?: boolean;
//     isActive?: (location: Location) => boolean;
//     Component?: React.ForwardRefRenderFunction<HTMLAnchorElement, LinkComponentProps>;
//   };
export interface ParsedQuery<T = string> {
  [key: string]: T | T[] | null | undefined;
}
export type LinkComponentProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  RouterPushOptions & {
    href: string | Location;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
    isActive?: (location: Location) => boolean;
    Component?: React.ForwardRefRenderFunction<HTMLAnchorElement, LinkComponentProps>;
  };
export interface Location {
  protocol?: string | null;
  hostname?: string;
  port?: string;
  pathname: string;
  pathroute?: string;
  pathlocale?: string;
  pathcontext?: string;
  query?: ParsedQuery<string>;
  hash?: ParsedQuery<string>;
  host?: string;
  href?: string;
  relativeurl?: string;
  baseurl?: string;
  state?: AnonymousObject;
}
export type LocationChangeCallback = (location: Location, context: { settings: AppSettings; i18n: I18n }) => void;
export interface RouterPushOptions {
  shallow?: boolean;
  locale?: string | false;
}
export type UnregisterCallback = () => void;
// export type LocationChangeCallback = (location: Location, context: { settings: AppSettings; i18n: I18n }) => void;
// export interface RouterPushOptions {
//   shallow?: boolean;
//   locale?: string | false;
// }
// export type UnregisterCallback = () => void;
export interface Router {
  readonly location: Location;
  readonly previousLocation: Location;
  readonly hash: ParsedQuery<string> | null | undefined;
  readonly query: ParsedQuery<string> | null | undefined;
  readonly href: string | null | undefined;
  readonly pathname: string | null;
  readonly state: AnonymousObject | null | undefined;
  settings: AppSettings;
  i18n: I18n;
  history: Location[];
  params: AnonymousObject;
  route?: string;
  back(delta?: number): void;
  deleteOrigin(): void;
  forward(delta?: number): void;
  getReactContext(): React.Context<any>;
  getLinkComponent(
    props: LinkProps,
    ref: ((instance: HTMLAnchorElement | null) => void) | MutableRefObject<HTMLAnchorElement | null> | null,
  ): JSX.Element;
  getOrigin(): { from: string };
  init(settings: AppSettings): void;
  listen(callback: LocationChangeCallback): UnregisterCallback;
  push(urlOrLocation: string | Location, options?: RouterPushOptions): void;
  replace(urlOrLocation: string | Location, options?: RouterPushOptions): void;
  saveOrigin(force?: boolean): void;
}

export interface RouterContext {
  location: Location;
  match: {
    params: AnonymousObject;
  };
}

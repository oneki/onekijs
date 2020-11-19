import qs from 'query-string';
import { AppSettings } from '../app/typings';
import { AnonymousObject } from '../core/typings';
import { I18n } from '../i18n/typings';

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
  query?: qs.ParsedQuery<string>;
  hash?: qs.ParsedQuery<string>;
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

import qs from 'query-string';

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  RouterPushOptions & {
    href: string | Location;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
  };
export interface Location {
  protocol?: string | null;
  hostname?: string;
  port?: string;
  pathname: string;
  query?: qs.ParsedQuery<string>;
  hash?: qs.ParsedQuery<string>;
  host?: string;
  href?: string;
  relativeurl?: string;
  baseurl?: string;
  state?: string;
}
export type LocationChangeCallback = (location: Location) => void;
export interface RouterPushOptions {
  shallow?: boolean;
  locale?: string | false;
}
export type UnregisterCallback = () => void;

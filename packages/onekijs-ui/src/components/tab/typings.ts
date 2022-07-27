import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';

export type TabProps<T = string> = {
  initialActive?: boolean;
  title: T;
  Component?: FCC<TabTitleProps<T>>;
  visible?: boolean;
  closable?: boolean;
  disabled?: boolean;
};

export type TabTitleProps<T = string> = {
  title: T;
  active: boolean;
  closable: boolean;
  onClick: AnyFunction;
};

export type TabState = {
  active: boolean;
  uid: string;
  disabled?: boolean;
  visible?: boolean;
};

export type TabsProps = {
  Component?: FCC<Omit<TabsProps, 'Component'>>;
  className?: string;
  animate?: number;
};

export type TabsState = {
  tabs: AnonymousObject<TabState>;
  animate: number;
};

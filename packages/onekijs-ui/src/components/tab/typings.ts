import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';
import { FC, ReactNode } from 'react';
import { TabsService } from './TabsService';

export type TabProps<T = string> = {
  active?: boolean;
  title: T;
  Component?: FCC<TabTitleProps<T>>;
  visible?: boolean;
  closable?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  TitleComponent?: FC;
};

export type TabTitleProps<T = string> = {
  tab: TabState<T>;
  onActivate: AnyFunction;
};

export type TabState<T> = {
  active: boolean;
  uid: string;
  disabled: boolean;
  visible: boolean;
  closable: boolean;
  title: T;
  icon?: ReactNode;
};

export type TabsProps<T = string> = {
  Component?: FCC<Omit<TabsProps, 'Component'>>;
  className?: string;
  animate?: number;
  controller?: TabsService<T>;
  onAdd?: AnyFunction;
};

export type ControlledTabsProps<T = string> = TabsProps<T> & {
  controller: TabsService<T>;
};

export type TabsState<T = string> = {
  tabs: AnonymousObject<TabState<T>>;
  animate: number;
};

export type UseTabsController<T = string> = (props: { animate?: number }) => TabsService<T>;

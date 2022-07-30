import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';
import { ReactNode } from 'react';
import { TabsService } from './TabsService';

export type TabProps = {
  active?: boolean;
  title: string;
  Component?: FCC<TabTitleProps>;
  visible?: boolean;
  closable?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  uid?: string;
} & AnonymousObject<unknown>;

export type TabTitleProps = {
  tab: TabState;
  onActivate: (tab: TabState) => void;
} & AnonymousObject<unknown>;

export type TabState = {
  active: boolean;
  uid: string;
  disabled: boolean;
  visible: boolean;
  closable: boolean;
  title: string;
  icon?: ReactNode;
  TitleComponent: FCC<TabTitleProps>;
};

export type TabsProps = {
  Component?: FCC<Omit<TabsProps, 'Component'>>;
  className?: string;
  animate?: number;
  controller?: TabsService;
  onAdd?: AnyFunction;
  layout?: 'horizontal' | 'vertical';
};

export type ControlledTabsProps = TabsProps & {
  controller: TabsService;
};

export type TabsState = {
  tabs: TabState[];
  tabsIndex: AnonymousObject<number>;
  animate: number;
  active?: string;
};

export type UseTabsController = (props: { animate?: number }) => TabsService;

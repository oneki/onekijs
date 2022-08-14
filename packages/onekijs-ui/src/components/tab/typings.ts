import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';
import { ReactNode } from 'react';
import { TabsService } from './TabsService';

export type TabProps = {
  active?: boolean;
  title: string;
  visible?: boolean;
  closable?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  uid?: string;
};

export type TabTitleProps<M extends TabState = TabState> = {
  member: M;
  onActivate: (member: M) => void;
};

export type TabState = {
  active: boolean;
  closable: boolean;
  disabled: boolean;
  error?: string;
  icon?: ReactNode;
  loading: boolean;
  success?: boolean;
  title: string;
  touching: boolean;
  touched: boolean;
  touchingError?: string;
  touchingWarning?: string;
  uid: string;
  visible: boolean;
  warning?: string;
};

export type TabsProps = {
  Component?: FCC<Omit<TabsProps, 'Component'>>;
  TitleComponent?: React.FC<TabTitleProps>;
  className?: string;
  animate?: number;
  controller?: TabsService;
  onAdd?: AnyFunction;
  layout?: 'horizontal' | 'vertical';
};

export type ControlledTabsProps = TabsProps & {
  controller: TabsService;
};

export type TabsState<M extends TabState = TabState> = {
  members: M[];
  membersIndex: AnonymousObject<number>;
  animate: number;
  active?: string;
};

export type UseTabsController = (props: { animate?: number }) => TabsService;

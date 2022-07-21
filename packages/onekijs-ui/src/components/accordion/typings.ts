import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';

export type AccordionPanelProps<T = string> = {
  initialActive?: boolean;
  title: T;
  Component?: FCC<AccordionPanelTitleProps<T>>;
};

export type AccordionPanelTitleProps<T = string> = {
  title: T;
  active: boolean;
  onClick: AnyFunction;
};

export type AccordionPanelState = {
  active: boolean;
  uid: string;
  collapsing?: boolean;
  expanding?: boolean;
};

export type AccordionProps = {
  border?: boolean;
  Component?: FCC<Omit<AccordionProps, 'Component'>>;
  className?: string;
  multiActive?: boolean;
  animate?: number;
};

export type AccordionState = {
  panels: AnonymousObject<AccordionPanelState>;
  multiActive?: boolean;
  animate: number;
};

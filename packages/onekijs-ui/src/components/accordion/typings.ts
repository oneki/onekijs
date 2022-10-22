import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';

export type AccordionPanelProps<T = string> = {
  initialActive?: boolean;
  title: T;
  Component?: FCC<AccordionPanelTitleProps<T>>;
  link?: string;
};

export type AccordionPanelTitleProps<T = string> = {
  title: T;
  active: boolean;
  onClick: AnyFunction;
  link?: string;
};

export type AccordionPanelState = {
  active: boolean;
  uid: string;
  collapsing?: boolean;
  expanding?: boolean;
};

/**
 * @group Accordion
 * @category types
 */
export type AccordionProps = {
  /**
   * a flag to indicate if the border is visible or not
   *
   * @example test
   * @defaultValue true
   */
  border?: boolean;
  Component?: FCC<Omit<AccordionProps, 'Component'>>;
  className?: string;
  /**
   * @defaultValue false
   */
  multiActive?: boolean;
  /**
   * @defaultValue 150
   */
  animate?: number;
};

export type AccordionState = {
  panels: AnonymousObject<AccordionPanelState>;
  multiActive?: boolean;
  animate: number;
};

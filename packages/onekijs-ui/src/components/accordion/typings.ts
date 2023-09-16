import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';

export type AccordionPanelProps<T = string> = {
  initialActive?: boolean;
  initialExpand?: boolean;
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
  expanded?: boolean;
};

/**
 * @group Accordion
 * @category types
 */
export type AccordionProps = {
  /**
   * a flag to indicate if the border is visible or not
   *
   * @example false
   * @defaultValue true
   */
  border?: boolean;
  Component?: FCC<Omit<AccordionProps, 'Component'>>;
  className?: string;
  /**
   * @defaultValue false
   */
  multiExpand?: boolean;
  /**
   * @defaultValue 150
   */
  animate?: number;
  /**
   * push means that the height of the accordion panel is derived from the height of its content
   * pushToBottom means that the height of the accordion panel is the remaining space given by the accordion's container after removing the space taken by the other accordion panel titles (do not work if multiExpand is true)
   *
   * @defaultValue push
   */
  mode?: 'push' | 'pushToBottom';
};

export type AccordionState = {
  panels: AnonymousObject<AccordionPanelState>;
  multiExpand?: boolean;
  animate: number;
  mode?: 'push' | 'pushToBottom';
};

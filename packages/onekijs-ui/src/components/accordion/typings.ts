import { AnonymousObject, AnyFunction, FCC } from 'onekijs-framework';

/**
 * @group Accordion
 * @category types
 */
export type AccordionPanelProps<T = string> = {
  /**
   * Indicates if the panel is active. This value cannot be changed afterwards since it's managed by the accordion
   * Active and expand are similar if it's "single-expand" accordion. For a multi-expand accordion, the active panel is the last expanded one
   * Only one panel can be active at the same time
   *
   * @defaultValue false
   */
  initialActive?: boolean;
  /**
   * Indicates if the panel is expanded. This value cannot be changed afterwards since it's managed by the accordion
   *
   * @defaultValue false
   */
  initialExpand?: boolean;
  /**
   * The title of the panel. This value is rendered by the property Component
   *
   * @remarks #important#
   */
  title: T;
  /**
   * The component used to render the title
   *
   * @defaultValue AccordionPanelTitle
   */
  Component?: FCC<AccordionPanelTitleProps<T>>;
  /**
   * Used to redirect the user to an URL instead of expanding a content
   *
   * @example  /users
   */
  link?: string;
};

/**
 * @group Accordion
 * @category types
 */
export type AccordionPanelTitleProps<T = string> = {
  /**
   * The title that must be rendered by the Component
   */
  title: T;
  /**
   * Indicates that the panel is the active one
   */
  active: boolean;
  /**
   * Listener that is called when the user clicks on the title
   */
  onClick: AnyFunction;
  /**
   * Indicates that a click on the title should redirect the user to an URL instead of expanding a content
   */
  link?: string;
};

/**
 * Defines the state of an accordion panel
 *
 * @group Accordion
 * @category types
 */
export type AccordionPanelState = {
  /**
   * Indicates if the panel is active.
   * Active and expand are similar if it's "single-expand" accordion. For a multi-expand accordion, the active panel is the last expanded one
   * Only one panel can be active at the same time
   */
  active: boolean;
  /**
   * a unique id auto-generated for each panel
   */
  uid: string;
  /**
   * Indicates if the panel is collapsing (only useful when there are some animations)
   */
  collapsing?: boolean;
  /**
   * Indicates if the panel is expanding (only useful when there are some animations)
   */
  expanding?: boolean;
  /**
   * Indicates whether the panel is expanded or collapsed
   */
  expanded?: boolean;
};

/**
 * Defines the props of an Accordion
 *
 * @group Accordion
 * @category types
 */
export type AccordionProps = {
  /**
   * a flag to indicate whether the border of the accordion is visible or not
   *
   * @defaultValue true
   */
  border?: boolean;
  /**
   * The unstyled component that is used to render the accordion
   *
   * @defaultValue AccordionComponent
   */
  Component?: FCC<Omit<AccordionProps, 'Component'>>;
  /**
   * A CSS class name that is attached to the accordion root element
   * Multiple class names must be separated by commas
   *
   */
  className?: string;
  /**
   * Indicates if multiple panels can be expanded at the same time
   *
   * @defaultValue false
   */
  multiExpand?: boolean;
  /**
   * The animation duration when a panel is expanded or collapse
   * A value of 0 disables the animation
   *
   * @defaultValue 150
   */
  animate?: number;
  /**
   * `push` means that the height of an accordion panel is derived from the height of its content
   * `pushToBottom` means that the height of the accordion panel is the remaining space given by the accordion's container after removing the space taken by the other accordion panel titles (does not work if multiExpand is true)
   *
   * @defaultValue push
   */
  mode?: 'push' | 'pushToBottom';
};

/**
 * Defines the state of an Accordion.
 * Used internally by the AccordionService
 *
 * @group Accordion
 * @category types
 */
export type AccordionState = {
  /**
   * The state of each panel member of the Accordion
   */
  panels: AnonymousObject<AccordionPanelState>;
  /**
   * Indicates if multiple panels can be expanded at the same time
   */
  multiExpand?: boolean;
  /**
   * The animation duration when a panel is expanded or collapse
   * A value of 0 disables the animation
   */
  animate: number;
  /**
   * `push` means that the height of an accordion panel is derived from the height of its content
   * `pushToBottom` means that the height of the accordion panel is the remaining space given by the accordion's container after removing the space taken by the other accordion panel titles (does not work if multiExpand is true)
   */
  mode?: 'push' | 'pushToBottom';
};

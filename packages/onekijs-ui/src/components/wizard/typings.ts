import { AnyFunction, FCC } from 'onekijs-framework';
import { ReactNode } from 'react';
import { GridSize } from '../grid/typings';
import { ModalProps } from '../modal/typings';
import { TabProps, TabsProps, TabsState, TabState, TabTitleProps } from '../tab/typings';
import { WizardService } from './WizardService';

export type ControlledWizardProps = WizardProps & {
  controller: WizardService;
};

export type StepProps = TabProps & {
  optional?: boolean;
};

export type StepState = TabState & {
  optional: boolean;
  touched: boolean;
};

export type StepTitleProps = TabTitleProps<StepState> & {
  index: number;
};

export type UseWizardController = (props: WizardProps) => WizardService;

export type WizardModalProps = ModalProps & WizardProps;

export type WizardProps = Omit<TabsProps, 'controller' | 'Component' | 'TitleComponent'> & {
  cancelLabel?: string;
  controller?: WizardService;
  Component?: FCC<Omit<WizardProps, 'Component'>>;
  doneLabel?: string;
  forwardOnly?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  stepSize?: GridSize;
  onCancel?: AnyFunction;
  onDone: AnyFunction;
  title?: ReactNode;
  TitleComponent?: React.FC<StepTitleProps>;
};

export type WizardState = TabsState<StepState> & {
  forwardOnly?: boolean;
};

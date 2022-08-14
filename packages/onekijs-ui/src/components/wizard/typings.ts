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
};

export type StepTitleProps<M extends StepState = StepState> = TabTitleProps<M> & {
  index: number;
};

export type UseWizardController = (props: WizardProps) => WizardService;

export type WizardModalProps<M extends StepState = StepState> = ModalProps & WizardProps<M>;

export type WizardProps<M extends StepState = StepState> = Omit<
  TabsProps,
  'controller' | 'Component' | 'TitleComponent'
> & {
  cancelLabel?: string;
  controller?: WizardService;
  Component?: FCC<Omit<WizardProps, 'Component'>>;
  doneLabel?: string;
  forwardOnly?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  stepSize?: GridSize;
  onCancel?: AnyFunction;
  onDone?: AnyFunction;
  onNext?: (currentStep: M, nextStep: M) => boolean;
  onPrevious?: (currentStep: M, previousStep: M) => boolean;
  title?: ReactNode;
  TitleComponent?: React.FC<StepTitleProps>;
};

export type WizardState<M extends StepState = StepState> = TabsState<M> &
  Pick<WizardProps<M>, 'onCancel' | 'onDone' | 'onNext' | 'onPrevious'> & {
    forwardOnly?: boolean;
    submitting?: boolean;
  };

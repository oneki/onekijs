import { AnyFunction, FCC } from 'onekijs-framework';
import React, { ReactNode } from 'react';
import { GridSize } from '../grid/typings';
import { ModalProps } from '../modal/typings';
import { TabProps, TabsProps, TabsState, TabState, TabTitleProps } from '../tab/typings';
import { WizardService } from './WizardService';

export type ControlledWizardProps = WizardProps & {
  controller: WizardService;
};

export type StepProps = TabProps & {
  optional?: boolean;
  showTitle?: boolean;
  help?: ReactNode;
  onTouch?: () => void;
};

export type FormStepProps = StepProps & {
  name: string;
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
  cancelLabel?: ReactNode;
  controller?: WizardService;
  Component?: FCC<Omit<WizardProps, 'Component'>>;
  doneLabel?: ReactNode;
  reviewLabel?: ReactNode;
  forwardOnly?: boolean;
  inModal?: boolean;
  nextLabel?: ReactNode;
  previousLabel?: string;
  stepSize?: GridSize;
  onCancel?: AnyFunction;
  onDone?: AnyFunction;
  onNext?: (currentStep: M, nextStep: M) => boolean;
  onPrevious?: (currentStep: M, previousStep: M) => boolean;
  title?: ReactNode;
  TitleComponent?: React.FC<StepTitleProps>;
  hasSummaryStep?: boolean;

};

export type WizardState<M extends StepState = StepState> = TabsState<M> &
  Pick<WizardProps<M>, 'onCancel' | 'onDone' | 'onNext' | 'onPrevious'> & {
    forwardOnly?: boolean;
    submitting?: boolean;
  };

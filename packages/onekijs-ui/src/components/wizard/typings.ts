import { FCC } from 'onekijs-framework';
import { ReactNode } from 'react';
import { GridSize } from '../grid/typings';
import { TabProps, TabsProps, TabsState, TabState, TabTitleProps } from '../tab/typings';
import { WizardService } from './WizardService';

export type ControlledWizardProps = WizardProps & {
  controller: WizardService;
};

export type StepProps = Omit<TabProps, 'Component'> & {
  Component?: FCC<StepTitleProps>;
};

export type StepState = Omit<TabState, 'TitleComponent'> & {
  TitleComponent: FCC<StepTitleProps>;
};

export type StepTitleProps = TabTitleProps<StepState>;

export type UseWizardController = (props: { animate?: number }) => WizardService;

export type WizardProps = Omit<TabsProps, 'controller' | 'Component'> & {
  Component?: FCC<Omit<WizardProps, 'Component'>>;
  controller?: WizardService;
  title?: ReactNode;
  stepSize?: GridSize;
};

export type WizardState = TabsState<StepState>;

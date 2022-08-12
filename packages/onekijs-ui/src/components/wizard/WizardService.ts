import { service } from 'onekijs-framework';
import { TabsService } from '../tab/TabsService';
import { StepState, WizardState } from './typings';

@service
export class WizardService extends TabsService<WizardState, StepState> {}

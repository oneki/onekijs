import React, { useContext } from 'react';
import { WizardState } from '../typings';

export const WizardStateContext = React.createContext<WizardState>(null!);
export const useWizardState = (): WizardState => {
  return useContext(WizardStateContext);
};

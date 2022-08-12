import React, { useContext } from 'react';
import { WizardService } from '../WizardService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const WizardServiceContext = React.createContext<WizardService>(null!);

const useWizardService = (): WizardService => {
  return useContext(WizardServiceContext);
};

export default useWizardService;

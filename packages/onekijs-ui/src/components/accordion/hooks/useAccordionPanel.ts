import { useEffect, useId } from 'react';
import { AccordionPanelState } from '../typings';
import useAccordionService from './useAccordionService';
import { useAccordionState } from './useAccordionState';

const useAccordionPanel = (initialActive = false): AccordionPanelState | undefined => {
  const uid = useId();
  const service = useAccordionService();
  const state = useAccordionState();
  const panel = state.panels[uid];
  useEffect(() => {
    if (panel === undefined) {
      service.initPanel(uid, initialActive);
    }
  });
  return panel;
};

export default useAccordionPanel;

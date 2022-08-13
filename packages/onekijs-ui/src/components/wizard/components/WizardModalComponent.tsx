import { FCC } from 'onekijs-framework';
import React from 'react';
import Wizard from '..';
import Modal from '../../modal';
import { WizardModalProps } from '../typings';

const WizardModalComponent: FCC<WizardModalProps> = ({ title, doneLabel = 'Submit', ...props }) => {
  return (
    <Modal {...props}>
      <Wizard {...props} title={title} />
    </Modal>
  );
};

export default WizardModalComponent;

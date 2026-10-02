import { Button, ComponentStyle, Modal, padding } from 'onekijs-ui';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const modalStyle: ComponentStyle<{}> = () => {
  return css`
    ${padding('xl')}
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const cancelButton = <Button pattern="outline" kind="primary" onClick={() => setOpen(false)}>Cancel</Button>;
  return (
    <>
      <Modal title="Hello World" open={open} onClose={() => setOpen(false)} buttons={[cancelButton]} closeOnClickOutside={true} closeOnEscape={true}>
      <div className={className}>
        Hello World<br />
      </div>
      </Modal>
      <button onClick={() => setOpen(!open)}>{open ? 'Close modal' : 'Open modal'}</button>
    </>
  );
};

export const ModalPage = styled(Page)`
  ${modalStyle}
`;

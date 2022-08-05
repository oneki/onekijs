import { Checkbox, ComponentStyle } from 'onekijs-ui';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const checkboxStyle: ComponentStyle<{}> = () => {
  return css``;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox value={checked} onChange={setChecked} />;
};

export const CheckboxPage = styled(Page)`
  ${checkboxStyle}
`;

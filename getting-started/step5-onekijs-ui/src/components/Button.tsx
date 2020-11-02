import { backgroundColor, paddingX, paddingY } from 'onekijs-ui';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  ${paddingY(2)}
  ${paddingX(4)}
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  ${backgroundColor('primary')}
  color: white;
  border: none;
`;

export default Button;

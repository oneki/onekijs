import { Button as AntdButton } from 'antd';
import { CompoundedComponent } from 'onekijs-ui/src/components/button/typings';
import styled from 'styled-components';
import buttonStyle from './style';

const Button: CompoundedComponent = styled(AntdButton)`
  ${buttonStyle}
`;

export default Button;

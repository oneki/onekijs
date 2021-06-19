import {
  alignItems,
  backgroundColor,
  border,
  borderRadius,
  color,
  cursor,
  display,
  fontSize,
  paddingRight,
  paddingX,
  paddingY,
} from 'onekijs-ui';
import { NavLink } from 'onekijs';
import styled from 'styled-components';

const NavbarCheckout = styled(NavLink)`
  ${display('inline-flex')}
  ${alignItems('center')}
  ${paddingY(2)}
  ${paddingX(4)}
  ${borderRadius('2px')}
  ${fontSize('14px')}
  ${cursor('pointer')}
  ${backgroundColor('white')}
  ${color('#1976d2')}
  ${border('none')}

  i.material-icons {
    ${color('primary')}
    ${paddingRight(2)}
  }
`;

export default NavbarCheckout;

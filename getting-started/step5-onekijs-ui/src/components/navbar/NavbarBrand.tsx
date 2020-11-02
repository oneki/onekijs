import { color, fontSize, margin } from 'onekijs-ui';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarBrand = styled(NavLink)`
  ${color('white')}
  ${margin(0)}
  ${fontSize('32px')}
`;

export default NavbarBrand;

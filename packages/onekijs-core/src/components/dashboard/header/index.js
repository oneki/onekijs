import React from 'react'
import styled from 'styled-components';

const Component = styled.div`
  grid-area: header;
`;

const Header = React.memo(props => {
  return (
    <Component {...props}>{props.children}</Component>
  )
});

Header.$dashboardType = 'header';

export default Header;


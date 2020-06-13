import React from 'react'
import styled from 'styled-components';


const Component = styled.div`
  grid-area: footer; 
`;

const Footer = React.memo(props => {
  return (
    <Component {...props}>{props.children}</Component>
  )
});

Footer.$dashboardType = 'footer';

export default Footer;


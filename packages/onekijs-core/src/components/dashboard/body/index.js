import React from 'react'
import styled from 'styled-components';


const Component = styled.div`
  grid-area: body;
`;

const Body = React.memo(props => {
  return (
    <Component {...props}>{props.children}</Component>
  )
});

Body.$dashboardType = 'body';

export default Body;


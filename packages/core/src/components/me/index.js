import React from 'react'
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { Icon, InlineIcon } from '@iconify/react';
import roundKeyboardArrowDown from '@iconify/icons-ic/round-keyboard-arrow-down';

export const MeContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const MeUsername = styled.span`
  margin-right: 5px;
`

export const Me = React.forwardRef((props, ref) => {
  return <MeContainer ref={ref} {...props}><MeUsername>{props.username}</MeUsername><Avatar alt={props.username} /><Icon width="24px" height="24px" icon={roundKeyboardArrowDown} /></MeContainer>
});


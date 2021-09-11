import styled, { css } from 'styled-components';
import { ComponentStyle } from '../../..';
import { DashboardOverlayProps } from '../typings';

export const overlayStyle: ComponentStyle<DashboardOverlayProps> = ({ show }) => {
  return css`
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: ${show ? '1' : '0'};
    transform: translateX(${show ? '0' : '-100%'});
    transition: opacity 0.6s ease-in ${show ? '' : ', transform 0s linear 0.6s'};
  `;
};

const DashboardOverlay = styled.div`
  ${overlayStyle}
`;

export default DashboardOverlay;

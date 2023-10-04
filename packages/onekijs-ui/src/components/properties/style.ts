import { css } from 'styled-components';
import { paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { fontWeight } from '../../styles/typography';
import { PropertiesProps } from './typings';
import { flexWrap } from '../../styles/flex';

export const propertiesStyle: ComponentStyle<PropertiesProps> = ({ theme }) => {
  const t = theme.properties;
  return css`
    .o-property {
      ${paddingY(t.paddingY)}
      ${flexWrap('nowrap')}
    }
    .o-property-name {
      ${fontWeight(t.fontWeight)}
    }
  `;
};

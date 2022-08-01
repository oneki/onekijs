import { css } from 'styled-components';
import { paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { fontWeight } from '../../styles/typography';
import { PropertiesProps } from './typings';

export const propertiesStyle: ComponentStyle<PropertiesProps> = () => {
  return css`
    .o-property {
      ${paddingY('xs')}
    }
    .o-property-name {
      ${fontWeight('bold')}
    }
  `;
};

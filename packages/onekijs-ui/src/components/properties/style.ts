import { css } from 'styled-components';
import { marginBottom, marginLeft, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color, fontWeight, textDecoration, textDecorationStyle, textUnderlineOffset } from '../../styles/typography';
import { PropertiesProps } from './typings';
import { flexWrap } from '../../styles/flex';
import { cursor } from '../../styles/interactivity';
import { display } from '../../styles/display';
import { alignItems } from '../../styles/alignment';
import { width } from '../../styles/size';

export const propertiesStyle: ComponentStyle<PropertiesProps> = ({ theme }) => {
  const t = theme.properties;
  return css`
    .o-property {
      ${paddingY(t.paddingY)}
      ${flexWrap('wrap')}
      ${alignItems('flex-start')}
    }
    .o-property-name {
      ${fontWeight(t.fontWeight)}
    }
    .o-property-help {
      ${textDecoration('underline')}
      ${textDecorationStyle('dashed')}
      ${textUnderlineOffset('0.25rem')}
      ${cursor('help')}
    }
    .o-property-key {
      ${display('flex')}
      ${alignItems('center')}
    }

    .o-tooltip {
      ${cursor('pointer')}
      ${width(5)}
      ${marginBottom('2px')}
      ${color('pink')}
      ${marginLeft('xs')}
    }
  `;
};

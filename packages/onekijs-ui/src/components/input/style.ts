import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { display } from '../../styles/display';
import { flexGrow } from '../../styles/flex';
import { appearance, outline } from '../../styles/interactivity';
import { width } from '../../styles/size';
import { padding, paddingX, paddingY } from '../../styles/spacing';
import { ComponentStyle } from '../../styles/typings';
import { color } from '../../styles/typography';
import { preflight } from '../../utils/style';
import { InputProps } from './typings';

const inputStyle: ComponentStyle<InputProps> = () => {
  return css`
    ${preflight()}
    ${width('100%')} 
    ${backgroundColor('white')}
    ${display('flex')}
    ${alignItems('stretch')}
    ${borderWidth(1)}
    ${borderColor('gray-300')}
    ${borderRadius('md')}
    ${borderStyle('solid')}
    ${padding('1px')}
    &.o-input-focus {
      ${borderColor('primary')}
      ${borderWidth(2)}
      ${padding(0)}
    }
    .o-input-field {
      ${flexGrow(1)}
      ${paddingX('sm')}
      ${paddingY('xs')}
      ${appearance('none')}
      ${outline('none')}
      ${backgroundColor('inherit')}
      ${color('gray-800', { placeholder: 'gray-400' })}         
    }      
    

  `;
};

export default inputStyle;

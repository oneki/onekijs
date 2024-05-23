import { css } from 'styled-components';
import { ComponentStyle } from '../../styles/typings';
import { AlertProps } from './typings';
import { display } from '../../styles/display';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderStyle, borderWidth } from '../../styles/border';
import { color } from '../../styles/typography';
import { marginBottom, marginTop, padding } from '../../styles/spacing';

const getBackgroundColor = (kind: AlertProps['kind']) => {
  switch(kind) {
    case 'success': return 'green-100';
    case 'info': return 'blue-100';
    case 'warning': return 'orange-200';
    case 'error': return 'red-100';
    default: return 'lighter';
  }
}

const getBorderColor = (kind: AlertProps['kind']) => {
  switch(kind) {
    case 'success': return 'success';
    case 'info': return 'info';
    case 'warning': return 'warning';
    case 'error': return 'danger';
    default: return 'darker';
  }
}

const getFontColor = (kind: AlertProps['kind']) => {
  switch(kind) {
    case 'success': return 'green-800';
    case 'info': return 'blue-800';
    case 'warning': return 'orange-800';
    case 'error': return 'red-800';
    default: return 'darkest';
  }
}

const alertStyle: ComponentStyle<AlertProps> = ({ kind = 'info', marginTop: mTop = '0px', marginBottom: mBottom = '0px', size = 'medium' }) => {
  return css`
    ${display('flex')}
    ${alignItems('center')}
    ${backgroundColor(getBackgroundColor(kind))}
    ${borderColor(getBorderColor(kind))}
    ${color(getFontColor(kind))}
    ${padding(size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'md')}
    ${borderStyle('solid')}
    ${borderWidth('1px')}
    ${borderRadius('sm')}
    ${marginTop(mTop)}
    ${marginBottom(mBottom)}
  `
}

export default alertStyle;

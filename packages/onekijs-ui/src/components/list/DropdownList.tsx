import styled from 'styled-components';
import List from '.';
import { alignItems } from '../../styles/alignment';
import { backgroundColor } from '../../styles/background';
import { borderColor, borderRadius, borderWidth, boxShadow } from '../../styles/border';
import { display } from '../../styles/display';
import { cursor, userSelect } from '../../styles/interactivity';
import { overflowY } from '../../styles/overflow';
import { zIndex } from '../../styles/position';
import { minHeight, width } from '../../styles/size';
import { paddingX, paddingY } from '../../styles/spacing';
import { color, fontWeight } from '../../styles/typography';
import ListComponent from './components/ListComponent';

const DropdownList = styled(List)`
  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme.palette.colors[props.theme.colors.primary]}
    ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.colors[props.theme.colors.primary]};
    border: 3px solid ${(props) => props.theme.palette.colors[props.theme.colors.lighter]};
  }
  ${overflowY('hidden')}
  ${borderRadius('sm')}
  ${boxShadow('lg')}
  ${zIndex(2000)}
  ${backgroundColor('white')}
  ${borderWidth(1)}
  ${borderColor('light')}

  .o-list-item {
    ${width('full')}
    ${paddingX('lg')}
    ${paddingY('xs')}
    ${display('flex')}
    ${alignItems('center')}
    ${backgroundColor('transparent', { hover: 'gray-200' })}
    ${userSelect('none')}
    ${minHeight('32px')}
    &.list-item-highlighted {
      ${backgroundColor('gray-200')}
      ${color('inherit')}
    }
    &.o-list-item-selected {
      ${backgroundColor('blue-100')}
      ${color('primary')}
      ${fontWeight('bold')}
      ${cursor('default')}
    }
    &.o-list-item-selectable {
      ${cursor('pointer')}
    }
  }
}
`;

export default DropdownList as typeof ListComponent;

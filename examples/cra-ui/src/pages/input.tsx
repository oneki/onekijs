import {
  addClassname,
  alignItems,
  backgroundColor,
  borderRadius,
  borderWidth,
  color,
  cursor,
  display,
  fontSize,
  Input,
  InputProps,
  justifyContent,
  padding,
  paddingX,
  paddingY,
  SearchIcon,
  width,
} from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const SearchComponent: React.FC<InputProps> = ({ className }) => {
  return (
    <div className={addClassname('o-search-icon-container', className)}>
      <SearchIcon width="14px" height="14px" />
    </div>
  );
};

const StyledSearchComponent = styled(SearchComponent)`
  ${css`
    ${width('20px')}
    ${display('flex')}
    ${alignItems('center')}
    ${borderRadius('none')}
    ${justifyContent('center')}
    ${cursor('pointer')}
    ${backgroundColor('inherit', {
      hover: 'primary'
    })}
    ${color('primary', {
      hover: 'white'
    })}    
  `}
`;

const StyledInput = styled(Input)`
  ${css`
    ${backgroundColor('#f6f6f6')}
    ${borderWidth(0)}
    ${borderRadius('none')}
    ${padding(0)}
    .o-input-field {
      ${paddingY(1)}
      ${paddingX(1)}
    }
    ${fontSize('14px')}
  `}
`;

export const InputPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '300px' }}>
        <StyledInput name="toto" PrefixComponent={StyledSearchComponent} />
      </div>
    </div>
  );
};

import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { alignItems, justifyContent } from '../../../../styles/alignment';
import { backgroundColor } from '../../../../styles/background';
import { borderRadius, borderWidth } from '../../../../styles/border';
import { display } from '../../../../styles/display';
import { cursor, userSelect } from '../../../../styles/interactivity';
import { width } from '../../../../styles/size';
import { padding, paddingX, paddingY } from '../../../../styles/spacing';
import { color, fontSize } from '../../../../styles/typography';
import { addClassname } from '../../../../utils/style';
import { GridFilterProps } from '../../../grid/typings';
import SearchIcon from '../../../icon/SearchIcon';
import Input from '../../../input';
import { InputProps } from '../../../input/typings';
import useGridContext from '../../useGridContext';
import { getValueFromFilter } from '../../util';

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
    ${backgroundColor('inherit')}
    ${color('primary')}   
    ${userSelect('none')} 
  `}
`;

const StyledInput = styled(Input)`
  ${css`
    ${backgroundColor('#eee')}
    ${borderWidth(0)}
    ${borderRadius('none')}
    ${padding(0)}
    .o-input-field {
      ${paddingY(1)}
      ${paddingX(1)}
      ${fontSize('12px')}
    }
    
  `}
`;

const GridInputFilterComponent: React.FC<GridFilterProps> = ({ column }) => {
  const service = useGridContext();
  const filter = service.getFilterById(column.id);
  const value = getValueFromFilter(filter);
  console.log(service.items);
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      service.addFilterCriteria(column.id, 'i_like', e.target.value, false, column.id);
    } else {
      service.removeFilter(column.id);
    }
  };
  return <StyledInput value={value} onChange={onValueChange} PrefixComponent={StyledSearchComponent} />;
};

GridInputFilterComponent.displayName = 'GridInputFilterComponent';

export default GridInputFilterComponent;

import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { alignItems, justifyContent } from '../../../../styles/alignment';
import { backgroundColor } from '../../../../styles/background';
import { borderRadius } from '../../../../styles/border';
import { display } from '../../../../styles/display';
import { cursor, userSelect } from '../../../../styles/interactivity';
import { width } from '../../../../styles/size';
import { color } from '../../../../styles/typography';
import { addClassname } from '../../../../utils/style';
import SearchIcon from '../../../icon/SearchIcon';
import Input from '../../../input';
import { InputProps } from '../../../input/typings';
import { TableFilterProps } from '../../typings';
import useTableController from '../../hooks/useTableController';
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

// const StyledInput = styled(Input)`
//   ${css`
//     ${backgroundColor('#eee')}
//     ${borderWidth(0)}
//     ${borderRadius('none')}
//     ${padding(0)}
//     .o-input-field {
//       ${paddingY('xs')}
//       ${paddingX('xs')}
//       ${fontSize('12px')}
//     }

//   `}
// `;

const TableInputFilterComponent: React.FC<TableFilterProps> = ({ column }) => {
  const controller = useTableController();
  const filter = controller.getFilterById(column.id);
  const value = getValueFromFilter(filter);
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      controller.addFilterCriteria(column.id, 'i_like', e.target.value, false, column.id);
    } else {
      controller.removeFilter(column.id);
    }
  };
  return (
    <Input
      className="o-table-filter-input"
      value={value}
      onChange={onValueChange}
      PrefixComponent={StyledSearchComponent}
    />
  );
};

TableInputFilterComponent.displayName = 'TableInputFilterComponent';

export default TableInputFilterComponent;

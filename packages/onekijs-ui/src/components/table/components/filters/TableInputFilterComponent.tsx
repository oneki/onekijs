import React, { ChangeEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { alignItems, justifyContent } from '../../../../styles/alignment';
import { backgroundColor } from '../../../../styles/background';
import { borderRadius } from '../../../../styles/border';
import { display } from '../../../../styles/display';
import { cursor, userSelect } from '../../../../styles/interactivity';
import { width } from '../../../../styles/size';
import { color } from '../../../../styles/typography';
import { addClassname } from '../../../../utils/style';
import Dropdown from '../../../dropdown';
import SearchIcon from '../../../icon/SearchIcon';
import Input from '../../../input';
import { InputProps } from '../../../input/typings';
import useTableService from '../../hooks/useTableService';
import { TableHeaderCellProps } from '../../typings';
import { getValueFromFilter } from '../../util';

const SearchComponent: React.FC<InputProps> = ({ className }) => {
  const [showOperators, setShowOperators] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const toggleOperators = () => {
    setShowOperators(!showOperators);
  };
  const [dropping, setDropping] = useState(false);
  const [collapsing, setCollapsing] = useState(false);

  const style: React.CSSProperties = {};

  if (dropping || collapsing) {
    style['zIndex'] = 1001;
  }
  return (
    <div
      ref={setContainerRef}
      className={addClassname('o-search-icon-container', className)}
      style={{ position: 'relative' }}
    >
      <SearchIcon className="o-search-icon" width="14px" height="14px" onClick={toggleOperators} />
      {showOperators && (
        <Dropdown
          refElement={containerRef}
          open={showOperators}
          distance={0}
          animationTimeout={200}
          onDropStart={() => {
            setDropping(true);
          }}
          onCollapseStart={() => {
            setCollapsing(true);
          }}
          onDropDone={() => {
            setDropping(false);
          }}
          onCollapseDone={() => {
            setCollapsing(false);
          }}
        >
          <div>operators</div>
        </Dropdown>
      )}
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
      ${backgroundColor('inherit')}
      ${color('primary')}
      ${userSelect('none')}
      .o-search-icon {
        ${cursor('pointer')}
      }
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

const TableInputFilterComponent: React.FC<TableHeaderCellProps> = ({ column }) => {
  const controller = useTableService();
  const filter = controller.getFilterById(column.id);
  const filterValue = getValueFromFilter(filter);
  const [value, setValue] = useState(filterValue);
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      if (controller.state.local) {
        controller.addFilterCriteria(column.id, 'like', e.target.value, false, column.id);
      } else {
        setValue(e.target.value);
      }
    } else {
      setValue('');
      controller.removeFilter(column.id);
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!controller.state.local && e.key === 'Enter') {
      controller.addFilterCriteria(column.id, 'like', value, false, column.id);
    }
  };

  return (
    <Input
      className="o-table-filter-input"
      value={controller.state.local ? filterValue : value}
      onChange={onValueChange}
      onKeyUp={onKeyUp}
      PrefixComponent={StyledSearchComponent}
    />
  );
};

TableInputFilterComponent.displayName = 'TableInputFilterComponent';

export default TableInputFilterComponent;

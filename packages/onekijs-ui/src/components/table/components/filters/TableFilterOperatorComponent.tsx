import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../../../utils/event';
import { addClassname } from '../../../../utils/style';
import useDropdown from '../../../dropdown/hooks/useDropdown';
import SearchIcon from '../../../icon/SearchIcon';
import SuccessIcon from '../../../icon/SuccessIcon';
import TogglerIcon from '../../../icon/TogglerIcon';
import ListComponent from '../../../list/components/ListComponent';
import DropdownList from '../../../list/DropdownList';
import useListController from '../../../list/hooks/useListController';
import { ListItem, ListItemAdapter, ListItemProps } from '../../../list/typings';
import { filterListStyle } from '../../style';
import { TableFilterOperator, TableFilterOperatorProps } from '../../typings';

const TableFilterOperatorListItemContent: React.FC<ListItemProps> = ({ item, data }) => {
  return (
    <div className="o-filter-operator-list-item-content">
      <span className="o-filter-operator-list-item-icon">{item.selected && <SuccessIcon />}</span>
      <span>{data.text}</span>
    </div>
  );
};

const adapter: ListItemAdapter<TableFilterOperator> = (data) => {
  return {
    id: data.text,
    text: data.text,
    selectable: true,
  };
};

const FilterList = styled(DropdownList)`
  ${filterListStyle}
` as typeof ListComponent;

const TableFilterOperatorComponent: React.FC<TableFilterOperatorProps> = ({
  className,
  operators,
  onChange,
  selected,
}) => {
  const [showOperators, setShowOperators] = useState(false);
  const [Dropdown, triggerRef] = useDropdown();
  const toggleOperators = useCallback(() => {
    setShowOperators(!showOperators);
  }, [showOperators]);
  const [dropping, setDropping] = useState(false);
  const [collapsing, setCollapsing] = useState(false);

  const style: React.CSSProperties = {};

  if (dropping || collapsing) {
    style['zIndex'] = 1001;
  }

  const controller = useListController<TableFilterOperator>(operators, {
    adapter,
  });
  const service = controller.asService();
  const containeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useClickOutside([containeRef, listRef], () => setShowOperators(false));

  useEffect(() => {
    service.setSelected('value', selected ? [selected] : []);
  }, [selected, service]);

  const onSelectOperator = useCallback(
    (item: ListItem<TableFilterOperator>) => {
      if (item.data) {
        onChange(item.data);
      }
      toggleOperators();
    },
    [onChange, toggleOperators],
  );

  return (
    <div ref={containeRef} className={addClassname('o-table-filter-operator-container', className)}>
      <div ref={triggerRef}>
        <div className="o-filter-operator-icon-container" onClick={toggleOperators}>
          <SearchIcon className="o-filter-operator-icon" width="12px" height="12px" />
          <TogglerIcon
            closeArrowPosition="s"
            openArrowPosition="n"
            width="12px"
            height="12px"
            className="o-filter-operator-toggler"
          />
        </div>
        <Dropdown
          open={showOperators}
          placement="bottom-start"
          distance={5}
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
          widthModifier="min"
          attachToBody={true}
        >
          <div ref={listRef}>
            <FilterList
              controller={controller}
              onItemSelect={onSelectOperator}
              ItemContentComponent={TableFilterOperatorListItemContent}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default TableFilterOperatorComponent;

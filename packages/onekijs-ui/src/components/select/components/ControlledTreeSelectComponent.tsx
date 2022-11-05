import React, { useContext } from 'react';
import { addClassname } from '../../../utils/style';
import { ListItemHandler } from '../../list/typings';
import Tree from '../../tree';
import TreeItemComponent from '../../tree/components/TreeItemComponent';
import { isTreeItemExpanded } from '../../tree/util';
import {
  ControllerTreeSelectProps,
  SelectListComponentProps,
  TreeSelectController,
  TreeSelectItem,
  TreeSelectState,
} from '../typings';
import ControlledSelectComponent from './ControlledSelectComponent';
import SelectOptionComponent from './SelectOptionComponent';

export const TreeSelectPropsContext = React.createContext<ControllerTreeSelectProps<any, any, any, any>>(null!);
export const useTreeSelectPropsContext = <
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
>(): ControllerTreeSelectProps<T, I, S, C> => {
  return useContext(TreeSelectPropsContext);
};

const TreeSelectListComponent = <T = any, I extends TreeSelectItem<T> = TreeSelectItem<T>>(
  props: SelectListComponentProps<T, I>,
) => {
  const treeProps = useTreeSelectPropsContext<T, I>();
  const onSelect: ListItemHandler<T, I> = (item, index) => {
    if (item.selectable !== false && props.onItemSelect) {
      props.onItemSelect(item, index);
      return true;
    } else {
      isTreeItemExpanded(item, treeProps.controller)
        ? treeProps.controller.collapse(item, index)
        : treeProps.controller.expand(item, index);
      return false;
    }
  };

  return (
    <Tree
      {...props}
      {...treeProps}
      TreeItemComponent={SelectOptionComponent}
      className={addClassname('o-select-options', treeProps.className)}
      onSelect={onSelect}
      onActivate={props.onItemActivate}
      keyboardNavigable={true}
      listRef={props.optionsRef}
    />
  );
};

const ControlledTreeSelectComponent = <
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
  C extends TreeSelectController<T, I, S> = TreeSelectController<T, I, S>,
>(
  props: ControllerTreeSelectProps<T, I, S, C>,
) => {
  return (
    <TreeSelectPropsContext.Provider value={props}>
      <ControlledSelectComponent
        {...props}
        ListComponent={TreeSelectListComponent}
        OptionContentComponent={TreeItemComponent}
      />
    </TreeSelectPropsContext.Provider>
  );
};

export default ControlledTreeSelectComponent;

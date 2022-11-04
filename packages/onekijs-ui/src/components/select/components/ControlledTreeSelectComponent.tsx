import React, { useContext } from 'react';
import { addClassname } from '../../../utils/style';
import { CollectionListProps } from '../../list/typings';
import Tree from '../../tree';
import TreeItemComponent from '../../tree/components/TreeItemComponent';
import { ControllerTreeSelectProps, TreeSelectController, TreeSelectItem, TreeSelectState } from '../typings';
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
  props: CollectionListProps<T, I>,
) => {
  const treeProps = useTreeSelectPropsContext<T, I>();
  return (
    <Tree
      {...props}
      {...treeProps}
      TreeItemComponent={SelectOptionComponent}
      className={addClassname('o-select-options', treeProps.className)}
      onSelect={props.onItemSelect}
      onActivate={props.onItemActivate}
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

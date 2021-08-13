import { useField, useFormContext, useLazyRef } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Button from '../../button';
import Checkbox from '../../checkbox';
import { FormGridContext, FormGridProps, GridBodyCellProps, GridFooterProps, GridItem } from '../typings';
import useFormGridContext, { DefaultFormGridContext } from '../useFormGridContext';
import GridComponent from './GridComponent';

const DeleteRowComponent: React.FC<GridBodyCellProps> = ({ rowIndex }) => {
  const { remove, gridName } = useFormGridContext();
  const removeRow = () => {
    remove(gridName, rowIndex);
  };

  return <Button onClick={removeRow}>Remove</Button>;
};

const SelectRowComponent: React.FC<GridBodyCellProps> = ({ rowValue }) => {
  const { onSelect } = useFormGridContext();
  const selected = rowValue.meta?.selected;
  const toggle = (selected: boolean) => onSelect(rowValue, selected);
  return <Checkbox value={selected || false} onChange={toggle} />;
};

const FooterComponent: React.FC<GridFooterProps> = () => {
  const { add, gridName } = useFormGridContext();
  const addRow: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    add(gridName);
    e.preventDefault();
  };
  return (
    <div>
      <Button onClick={addRow}>Add</Button>
    </div>
  );
};

const FormGridComponent: React.FC<FormGridProps> = ({ controller, className, name, format = 'auto' }) => {
  const formContext = useFormContext();
  const { value, onChange } = useField(name);
  const formatRef = useLazyRef<'id' | 'object'>(() => {
    if (format === 'auto') {
      return value && value.length > 0 && typeof value[0] === 'object' ? 'object' : 'id';
    }
    return format;
  });

  const formGridContext = useLazyRef<FormGridContext>(() => {
    const onSelect = (item: GridItem, selected: boolean) => {
      const getId = (v: any) => {
        return formatRef.current === 'id' ? v : v.id;
      };
      const currentValues = formContext.valuesRef.current[name] || [];
      const value = formatRef.current === 'id' ? item.id : item.data;
      if (selected) {
        onChange([value].concat(currentValues));
      } else {
        onChange(currentValues.filter((v: any) => getId(v) !== getId(value)));
      }
    };
    return Object.assign({ gridName: name, onSelect }, formContext);
  });

  const service = controller.asService();
  useEffect(() => {
    if (service.dataSource) {
      service.setSelected((value || []).map((v: any) => (formatRef.current === 'id' ? v : service.adapt(v).id)));
    } else {
      service.setData(value || []);
    }
  }, [service, value, formatRef]);

  useEffect(() => {
    if (service.dataSource) {
      service.addColumn(
        {
          id: 'system.select',
          minWidth: '40px',
          maxWidth: '40px',
          filterable: false,
          sortable: false,
          CellComponent: SelectRowComponent,
        },
        0,
      );
    } else {
      service.addColumn(
        {
          id: 'system.insert',
          minWidth: '100px',
          maxWidth: '100px',
          filterable: false,
          sortable: false,
          CellComponent: DeleteRowComponent,
        },
        0,
      );
      service.setFooterComponent(FooterComponent);
      service.setFooter(true);
    }
  }, [service]);

  return (
    <DefaultFormGridContext.Provider value={formGridContext.current}>
      <GridComponent controller={controller} className={className} />
    </DefaultFormGridContext.Provider>
  );
};

export default FormGridComponent;

import { useField, useFormContext, useLazyRef } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Button from '../../button';
import Checkbox from '../../checkbox';
import { FormTableContext, FormTableProps, TableBodyCellProps, TableFooterProps, TableItem } from '../typings';
import useFormTableContext, { DefaultFormTableContext } from '../useFormTableContext';
import TableComponent from './TableComponent';

const DeleteRowComponent: React.FC<TableBodyCellProps> = ({ rowIndex }) => {
  const { remove, tableName } = useFormTableContext();
  const removeRow = () => {
    remove(tableName, rowIndex);
  };

  return <Button onClick={removeRow}>Remove</Button>;
};

const SelectRowComponent: React.FC<TableBodyCellProps> = ({ rowValue }) => {
  const { onSelect } = useFormTableContext();
  const selected = rowValue.meta?.selected;
  const toggle = (selected: boolean) => onSelect(rowValue, selected);
  return <Checkbox value={selected || false} onChange={toggle} />;
};

const FooterComponent: React.FC<TableFooterProps> = () => {
  const { add, tableName } = useFormTableContext();
  const addRow: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    add(tableName);
    e.preventDefault();
  };
  return (
    <div>
      <Button onClick={addRow}>Add</Button>
    </div>
  );
};

const FormTableComponent: React.FC<FormTableProps> = ({ controller, className, name, format = 'auto' }) => {
  const formContext = useFormContext();
  const { value, onChange } = useField(name);
  const formatRef = useLazyRef<'id' | 'object'>(() => {
    if (format === 'auto') {
      return value && value.length > 0 && typeof value[0] === 'object' ? 'object' : 'id';
    }
    return format;
  });

  const formTableContext = useLazyRef<FormTableContext>(() => {
    const onSelect = (item: TableItem, selected: boolean) => {
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
    return Object.assign({ tableName: name, onSelect }, formContext);
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
          minWidth: '50px',
          maxWidth: '50px',
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
    <DefaultFormTableContext.Provider value={formTableContext.current}>
      <TableComponent controller={controller} className={className} />
    </DefaultFormTableContext.Provider>
  );
};

export default FormTableComponent;

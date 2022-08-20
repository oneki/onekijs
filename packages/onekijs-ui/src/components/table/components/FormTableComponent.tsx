import { generateUniqueId, useForm, useLazyRef } from 'onekijs-framework';
import React, { useEffect } from 'react';
import { addClassname } from '../../../utils/style';
import Checkbox from '../../checkbox';
import RemoveIcon from '../../icon/RemoveIcon';
import TogglerIcon from '../../icon/TogglerIcon';
import useFormTableContext, { DefaultFormTableContext } from '../hooks/useFormTableContext';
import { FormTableContext, FormTableProps, TableBodyCellProps, TableFooterProps, TableItem } from '../typings';
import ControllerTableComponent from './ControllerTableComponent';

const DeleteRowComponent: React.FC<TableBodyCellProps> = ({ rowIndex }) => {
  const form = useForm();
  const { tableName } = useFormTableContext();
  const removeRow = () => {
    form.remove(tableName, rowIndex);
  };

  return (
    <div className="o-form-table-remove" onClick={removeRow}>
      <RemoveIcon width="14px" height="14px" />
    </div>
  );
};

const SelectRowComponent: React.FC<TableBodyCellProps> = ({ item }) => {
  const { onSelect } = useFormTableContext();
  const selected = item?.selected;
  const toggle = (selected: boolean) => onSelect(item, selected);
  return <Checkbox value={selected || false} onChange={toggle} />;
};

const FooterComponent: React.FC<TableFooterProps> = () => {
  const form = useForm();
  const { tableName, addLabel } = useFormTableContext();
  const addRow: React.MouseEventHandler<HTMLDivElement> = (e) => {
    form.add(tableName);
    e.preventDefault();
  };
  return (
    <div className="o-form-table-add" onClick={addRow}>
      <TogglerIcon open={false} model="plus" color="currentColor" />
      <span>{addLabel}</span>
    </div>
  );
};

const FormTableComponent: React.FC<FormTableProps<any, TableItem<any>>> = React.memo(
  ({ addLabel = 'add', controller, value, onChange, className, name, format = 'auto', ...props }) => {
    const form = useForm();
    const tableService = controller.asService();
    const formatRef = useLazyRef<'id' | 'object'>(() => {
      if (format === 'auto') {
        return value && value.length > 0 && typeof value[0] === 'object' ? 'object' : 'id';
      }
      return format;
    });

    const formTableContext = useLazyRef<FormTableContext>(() => {
      const onSelect = (item: TableItem<any>, selected: boolean) => {
        const getId = (v: any) => {
          return formatRef.current === 'id' ? v : v.id;
        };
        const currentValues = form.getValue(name, []);
        const value = formatRef.current === 'id' ? item.id : item.data;
        if (selected) {
          onChange && onChange([value].concat(currentValues));
        } else {
          onChange && onChange(currentValues.filter((v: any) => getId(v) !== getId(value)));
        }
      };
      return { tableName: name, onSelect, addLabel };
    });

    useEffect(() => {
      if (tableService.dataSource) {
        tableService.setSelected('value', value || []);
      } else if (value !== undefined) {
        tableService.setData(value);
      }
    }, [tableService, value, formatRef]);

    useEffect(() => {
      if (tableService.dataSource) {
        tableService.addColumn(
          {
            id: 'system.select',
            width: '50px',
            filterable: false,
            sortable: false,
            CellComponent: SelectRowComponent,
          },
          0,
        );
      } else {
        tableService.addColumn(
          {
            id: 'system.insert',
            width: '50px',
            filterable: false,
            sortable: false,
            CellComponent: DeleteRowComponent,
            className: 'o-form-table-remove-cell',
          },
          0,
        );
      }
    }, [tableService]);

    return (
      <DefaultFormTableContext.Provider value={formTableContext.current}>
        <ControllerTableComponent
          controller={controller}
          className={addClassname('o-form-table', className)}
          FooterComponent={tableService.dataSource ? undefined : FooterComponent}
          footer={tableService.dataSource ? false : true}
          NotFoundComponent={null}
          {...props}
        />
      </DefaultFormTableContext.Provider>
    );
  },
);

FormTableComponent.displayName = 'FormTable';

export default FormTableComponent;

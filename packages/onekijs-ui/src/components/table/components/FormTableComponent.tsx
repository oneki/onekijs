import { FormValueListener, LengthValidator, useForm, useFormMetadata, useLazyRef } from 'onekijs-framework';
import React, { useEffect, useId, useState } from 'react';
import { addClassname } from '../../../utils/style';
import Checkbox from '../../checkbox';
import RemoveIcon from '../../icon/RemoveIcon';
import TogglerIcon from '../../icon/TogglerIcon';
import useFormTableContext, { DefaultFormTableContext } from '../hooks/useFormTableContext';
import useTableColumns from '../hooks/useTableColumns';
import { FormTableContext, FormTableProps, TableBodyCellProps, TableFooterProps, TableItem } from '../typings';
import ControllerTableComponent from './ControllerTableComponent';

const DeleteRowComponent: React.FC<TableBodyCellProps> = ({ rowIndex }) => {
  const form = useForm();
  const { tableName } = useFormTableContext();
  const removeRow = () => {
    form.remove(tableName, rowIndex);
  };

  const metadata = useFormMetadata(tableName);
  let disabled = false;
  if (metadata.readOnly || (metadata.editable === false && form.config.reconfigure)) {
    disabled = true;
  }

  return (
    <div className={`o-form-table-remove${disabled ? ' o-form-table-remove-disabled' : ''}`} onClick={removeRow}>
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
  const { tableName, addLabel, maxLength, onAdd } = useFormTableContext();
  const isSingleColumnTable = useTableColumns().find((c) => c.id === '');
  const addRow: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    onAdd(isSingleColumnTable ? undefined : {});
  };
  const currentSize = (form.getValue(tableName) || []).length;
  if (maxLength !== undefined && currentSize >= maxLength) return null;
  return (
    <div className="o-form-table-add" onClick={addRow}>
      <TogglerIcon open={false} model="plus" color="currentColor" />
      <span>{addLabel}</span>
    </div>
  );
};

const FormTableComponent: React.FC<FormTableProps<any, TableItem<any>>> = React.memo(
  ({
    addLabel = 'add',
    controller,
    value,
    onChange,
    className,
    name,
    format = 'auto',
    required,
    minLength,
    maxLength,
    showAddButton = true,
    ...props
  }) => {
    const form = useForm();
    const field = form.fields[name];

    if (field) {
      const validators = field.validators;
      const minlengthValidator = (validators.minLength || validators.min) as LengthValidator | undefined;
      if (minlengthValidator) {
        minLength = minlengthValidator.length;
      }
      const maxlengthValidator = (validators.maxLength || validators.max) as LengthValidator | undefined;
      if (maxlengthValidator) {
        maxLength = maxlengthValidator.length;
      }
    }
    const id = useId();
    const tableService = controller.asService();
    const formatRef = useLazyRef<'id' | 'object'>(() => {
      if (format === 'auto') {
        return value && value.length > 0 && typeof value[0] === 'object' ? 'object' : 'id';
      }
      return format;
    });
    const [mounted, setMounted] = useState(false);

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

      const onAdd = (initialValue: Partial<unknown> | undefined) => {
        formTableContext.current.editable = true;
        form.add(name, initialValue);
      };

      return { tableName: name, onSelect, onAdd, addLabel, required, minLength, maxLength };
    });

    // listen on value change from the form
    // for the initial value in the table controller
    // delay the rendering of the table until the value has been set in the controller
    useEffect((): (() => void) => {
      const watch = [name];
      const listener: FormValueListener = (value) => {
        if (tableService.dataSource) {
          tableService.setSelected('value', value || []);
        } else if (value !== undefined) {
          tableService.setData(value);
        }
      };
      form.onValueChange(id, listener, watch);
      listener(value, undefined, name);
      setMounted(true);
      return (): void => {
        form.offValueChange(id);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    if (!mounted) return null;

    return (
      <DefaultFormTableContext.Provider value={formTableContext.current}>
        <ControllerTableComponent
          controller={controller}
          className={addClassname('o-form-table', className)}
          FooterComponent={tableService.dataSource ? undefined : FooterComponent}
          footer={tableService.dataSource || !showAddButton || props.disabled ? false : true}
          NotFoundComponent={null}
          {...props}
        />
      </DefaultFormTableContext.Provider>
    );
  },
);

FormTableComponent.displayName = 'FormTable';

export default FormTableComponent;

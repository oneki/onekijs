import { useField, useFormContext } from 'onekijs-framework';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import Button from '../../button';
import Checkbox from '../../checkbox';
import { FormGridContext, FormGridProps, GridBodyCellProps, GridFooterProps } from '../typings';
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
  const selected = rowValue.meta?.selected;
  return <Checkbox checked={selected || false} />;
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

const FormGridComponent: React.FC<FormGridProps> = ({ controller, className, name }) => {
  const formContext = useFormContext();
  const { value } = useField(name);
  const formGridContext = useRef<FormGridContext>(Object.assign({ gridName: name }, formContext));
  const service = controller.asService();
  useEffect(() => {
    if (service.hasDataSource()) {
      console.log('set Selected', value);
      service.setSelected(value);
    } else {
      service.setData(value);
    }
  }, [service, value]);

  useEffect(() => {
    if (service.hasDataSource()) {
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

import React, { FC, useEffect } from 'react';
import useTableController from '../hooks/useTableController';
import { ArrayTableProps } from '../typings';
import ControllerTableComponent from './ControllerTableComponent';

const ArrayTableComponent: FC<ArrayTableProps> = (props) => {
  let dataSource: string | any[] | undefined = undefined;;
  if (props.dataSource && !(typeof props.dataSource === 'string') && !Array.isArray(props.dataSource)) {
    // dataSource is an async function
    // we force it to be undefined and we are going to load the dataSource asynchronously
    dataSource = undefined;
  } else {
    dataSource = props.dataSource;
  }

  const controller = useTableController(dataSource, props.columns, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });

  useEffect(() => {
    const loadDataSource = (async() => {
      if (props.dataSource && !(typeof props.dataSource === 'string') && !Array.isArray(props.dataSource)) {
        const data = await props.dataSource();
        controller.setData(data);
      }
    })
    if (dataSource === undefined && props.dataSource !== undefined) {
      loadDataSource();
    }
  }, []);

  return <ControllerTableComponent {...props} controller={controller} />;
};

export default ArrayTableComponent;

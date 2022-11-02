import React, { FC } from 'react';
import useTreeSelectController from '../hooks/useTreeSelectController';
import { ArrayTreeSelectProps } from '../typings';
import ControllerSelectComponent from './ControllerSelectComponent';

const ArrayTreeSelectComponent: FC<ArrayTreeSelectProps> = (props) => {
  const controller = useTreeSelectController(props.dataSource, { adapter: props.adapter, fetchOnce: props.fetchOnce });
  return <ControllerSelectComponent {...props} controller={controller} />;
};

export default ArrayTreeSelectComponent;

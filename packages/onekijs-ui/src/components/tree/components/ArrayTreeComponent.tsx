import React, { FC } from 'react';
import useTreeController from '../hooks/useTreeController';
import { ArrayTreeProps } from '../typings';
import ControllerTreeComponent from './ControllerTreeComponent';

const ArrayTreeComponent: FC<ArrayTreeProps> = (props) => {
  const controller = useTreeController(props.dataSource, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });
  return <ControllerTreeComponent {...props} controller={controller} />;
};

export default ArrayTreeComponent;

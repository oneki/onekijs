import React, { FC } from 'react';
import { ButtonProps } from './typings';

const ButtonComponent: FC<ButtonProps> = (props) => {
  console.log('insideButtonComponent');
  return <button {...props} />;
};

export default ButtonComponent;

import React from 'react';
import { ButtonProps } from '../typings';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(({ kind, pattern, ...props }, ref) => {
  return <button {...props} ref={ref} />;
});

ButtonComponent.displayName = 'Button';

export default ButtonComponent;

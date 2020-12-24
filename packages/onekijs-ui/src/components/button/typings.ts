import { ButtonGroupProps, ButtonProps } from 'antd/lib/button';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  Group: React.FC<ButtonGroupProps>;
  __ANT_BUTTON: boolean;
}

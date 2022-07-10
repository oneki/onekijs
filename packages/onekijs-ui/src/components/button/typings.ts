import { ColorPropertyTheme } from '../../styles/typings';
import { DropdownProps } from '../dropdown/typings';
import { ListProps } from '../list/typings';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ColorPropertyTheme;
}

export interface DropDownButtonProps extends ButtonProps, ListProps, DropdownProps {}

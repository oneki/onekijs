import { ColorPropertyTheme } from '../../styles/typings';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ColorPropertyTheme;
}

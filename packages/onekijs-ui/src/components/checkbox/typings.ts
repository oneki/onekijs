export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'checked'> {
  label?: string;
  onChange?: (checked: boolean) => void;
  value?: boolean;
}

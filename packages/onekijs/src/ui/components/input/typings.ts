import { ValidationStatus } from '../../../types/form';
import { FieldSize } from '../../components/field/typings';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  PrefixComponent?: React.FC<InputProps>;
  SuffixComponent?: React.FC<InputProps>;
  status?: ValidationStatus;
  size?: FieldSize;
};

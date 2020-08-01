import { AnonymousObject, AnyFunction } from 'onekijs';
import { FC } from 'react';

export interface SelectInputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  open: boolean;
  onIconClick: AnyFunction<void>;
}

export interface SelectProps<T> extends React.InputHTMLAttributes<HTMLSelectElement> {
  InputComponent?: FC<SelectInputProps>;
  options?: T[];
  adapter?: SelectAdapter<T>;
  OptionComponent?: FC<SelectOptionProps<T>>;
}

export interface SelectOptionsProps<T> {
  options: T[];
  adapter?: SelectAdapter<T>;
  OptionComponent: FC<SelectOptionProps<T>>;
}

export interface SelectOptionProps<T> {
  option: T;
  adapter?: SelectAdapter<T>;
  index: number;
  search: string;
}

export interface SelectOption extends AnonymousObject {
  id: string | number;
  text: string;
}

export type SelectAdapter<T> = (value: T) => SelectOption;

import { FormDecoratorOptions } from 'onekijs-framework';
import { FC, ReactNode } from 'react';

export type CardProps = {
  bordered?: boolean;
  className?: string;
  collapsable?: boolean;
  animate?: number;
  title: string;
  TitleComponent?: FC<CardTitleProps>;
  icon?: ReactNode;
  open?: boolean;
  onToggle?: () => void;
};

export type CardTitleProps = {
  title: string;
  icon?: ReactNode;
  onToggle: () => void;
  open: boolean;
  collapsable: boolean;
  animate?: number;
};

export type FormCardProps = CardProps &
  FormDecoratorOptions & {
    name: string;
  };

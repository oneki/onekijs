import { FormDecoratorOptions } from 'onekijs-framework';
import { FC, ReactNode } from 'react';
import { StylableProps } from 'styles/typings';

export type CardProps = {
  bordered?: boolean;
  className?: string;
  collapsable?: boolean;
  animate?: number;
  title: string | ReactNode;
  TitleComponent?: FC<CardTitleProps>;
  icon?: ReactNode;
  open?: boolean;
  onToggle?: () => void;
};

export type CardTitleProps = {
  title: string | ReactNode;
  icon?: ReactNode;
  onToggle: () => void;
  open: boolean;
  collapsable: boolean;
  animate?: number;
};

export type FormCardProps = CardProps & FormBlockProps;

export type FormBlockProps = StylableProps & 
    FormDecoratorOptions & {
    name: string;
    help?: ReactNode;
  };

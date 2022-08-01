import { FC, ReactNode } from 'react';

export type CardProps = {
  bordered?: boolean;
  className?: string;
  collapsable?: boolean;
  animate?: number;
  title: string;
  TitleComponent?: FC<CardTitleProps>;
  icon?: ReactNode;
  initialOpen?: boolean;
};

export type CardTitleProps = {
  title: string;
  icon?: ReactNode;
  onToggle: () => void;
  open: boolean;
  collapsable: boolean;
  animate?: number;
};

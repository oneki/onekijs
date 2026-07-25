import { Placement } from '@floating-ui/react';
import { ReactNode } from 'react';
import { ColorPropertyTheme } from '../../styles/typings';

export interface TooltipProps {
  content?: ReactNode;
  className?: string;
  placement?: Placement;
  kind?: ColorPropertyTheme;
  delayHide?: number;
  delayShow?: number;
  attachToBody?: boolean;
}

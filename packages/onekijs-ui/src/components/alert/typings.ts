import React from 'react';
import { SpacingPropertyTheme, StylableProps } from '../../styles/typings';
import { IconProps } from '../icon/typings';

export type AlertProps = StylableProps & {
  kind?: 'success' | 'info' | 'warning' | 'error' | 'debug'
  icon?: boolean;
  IconComponent?: React.FC<IconProps>;
  marginBottom?: SpacingPropertyTheme;
  marginTop?: SpacingPropertyTheme;
  size?: 'small' | 'medium' | 'large'
}

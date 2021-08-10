import {
  GlobalsString,
  TransitionProperty,
  TransitionPropertyProperty,
  TransitionTimingFunctionProperty,
} from 'csstype';
import { cssProperty } from '../utils/style';

export const transition = cssProperty<TransitionProperty>('transition');
export const transitionDelay = cssProperty<GlobalsString>('transition-delay');
export const transitionDuration = cssProperty<GlobalsString>('transition-duration');
export const transitionProperty = cssProperty<TransitionPropertyProperty>('transition-property');
export const transitionTimingFunction = cssProperty<TransitionTimingFunctionProperty>('transition-timing-function');

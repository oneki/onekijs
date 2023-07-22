import { Property } from 'csstype';
import { cssProperty } from '../utils/style';

export const transition = cssProperty<Property.Transition>('transition');
export const transitionDelay = cssProperty<Property.TransitionDelay>('transition-delay');
export const transitionDuration = cssProperty<Property.TransitionDuration>('transition-duration');
export const transitionProperty = cssProperty<Property.TransitionProperty>('transition-property');
export const transitionTimingFunction = cssProperty<Property.TransitionTimingFunction>('transition-timing-function');

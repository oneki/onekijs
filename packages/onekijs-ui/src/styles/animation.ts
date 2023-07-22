import { Property } from 'csstype';
import { cssProperty } from '../utils/style';

export const animation = cssProperty<Property.Animation>('animation');
export const animationDelay = cssProperty<Property.AnimationDelay>('animation-delay');
export const animationDirection = cssProperty<Property.AnimationDirection>('animation-direction');
export const animationDuration = cssProperty<Property.AnimationDuration>('animation-duration');
export const animationFillMode = cssProperty<Property.AnimationFillMode>('animation-fill-mode');
export const animationIterationCount = cssProperty<Property.AnimationIterationCount>('animation-iteration-count');
export const animationName = cssProperty<Property.AnimationName>('animation-name');
export const animationPlayState = cssProperty<Property.AnimationPlayState>('animation-play-state');
export const animationTimingFunction = cssProperty<Property.AnimationTimingFunction>('animation-timing-function');

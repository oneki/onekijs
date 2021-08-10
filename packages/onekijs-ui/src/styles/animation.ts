import {
  AnimationDirectionProperty,
  AnimationFillModeProperty,
  AnimationIterationCountProperty,
  AnimationNameProperty,
  AnimationProperty,
  AnimationTimingFunctionProperty,
  GlobalsString,
} from 'csstype';
import { cssProperty } from '../utils/style';

export const animation = cssProperty<AnimationProperty>('animation');
export const animationDelay = cssProperty<GlobalsString>('animation-delay');
export const animationDirection = cssProperty<AnimationDirectionProperty>('animation-direction');
export const animationDuration = cssProperty<GlobalsString>('animation-duration');
export const animationFillMode = cssProperty<AnimationFillModeProperty>('animation-fill-mode');
export const animationIterationCount = cssProperty<AnimationIterationCountProperty>('animation-iteration-count');
export const animationName = cssProperty<AnimationNameProperty>('animation-name');
export const animationPlayState = cssProperty<AnimationPlayState>('animation-play-state');
export const animationTimingFunction = cssProperty<AnimationTimingFunctionProperty>('animation-timing-function');

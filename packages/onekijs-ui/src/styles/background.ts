import { BackgroundColorProperty } from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';

export const backgroundColor = cssProperty<BackgroundColorProperty>('background-color', themeFormatter('colors'));

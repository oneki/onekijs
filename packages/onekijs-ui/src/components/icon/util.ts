import { IconProps } from './typings';

export const getIconDivProps = (props: IconProps) => {
  const { color, marginRight, marginLeft, ...result } = props;
  return result;
}

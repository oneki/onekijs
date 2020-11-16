import React from 'react';
import { LinkProps } from './typings';
import useOnekiRouter from './useOnekiRouter';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const router = useOnekiRouter();
  return router.getLinkComponent(props, ref);
});

Link.displayName = 'Link';

export default Link;

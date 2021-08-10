import React from 'react';
import { LinkProps } from '../types/router';
import useRouter from './useRouter';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const router = useRouter();
  return router.getLinkComponent(props, ref);
});

Link.displayName = 'Link';

export default Link;

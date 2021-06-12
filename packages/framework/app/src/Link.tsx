import { LinkProps } from '@oneki/types';
import React from 'react';
import useRouter from './useRouter';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const router = useRouter();
  return router.getLinkComponent(props, ref);
});

Link.displayName = 'Link';

export default Link;

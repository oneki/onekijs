import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

export const SS_KEY_404 = 'onekijs.notfound';

// type NotFoundPageProps = {
//   Component: FC;
// };

export default function withNotFound(WrappedComponent: React.ComponentType): FC {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'NotFoundComponent';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithNotFound = () => {
    const router = useRouter();
    const [showErrorComponenent, setShowErrorComponent] = useState<boolean>(false);

    useEffect(() => {
      if (sessionStorage.getItem(SS_KEY_404) === null) {
        sessionStorage.setItem(SS_KEY_404, 'true');
        router.push(router.asPath);
      } else {
        sessionStorage.removeItem(SS_KEY_404);
        setShowErrorComponent(true);
      }
    }, [router]);
    if (!showErrorComponenent) return null;
    // props comes afterwards so the can override the default ones.
    return <WrappedComponent />;
  };

  ComponentWithNotFound.displayName = `withNotFound(${displayName})`;

  return ComponentWithNotFound;
}

// const NotFoundPage: FC<NotFoundPageProps> = () => {
//   const router = useRouter();
//   const [showErrorComponenent, setShowErrorComponent] = useState<boolean>(false);

//   useEffect(() => {
//     if (sessionStorage.getItem(SS_KEY_404) === null) {
//       sessionStorage.setItem(SS_KEY_404, 'true');
//       router.push(router.asPath);
//     } else {
//       sessionStorage.removeItem(SS_KEY_404);
//       setShowErrorComponent(true);
//     }
//   }, [router]);

//   if (showErrorComponenent) return <div>Page not found</div>;
//   return null;
// };

// export default NotFoundPage;

import { FCC, useLazyRef } from 'onekijs-framework';
import React, { useRef, useState } from 'react';
import Dropdown from '..';
import { DropdownProps } from '../typings';

const useDropdown = (): [FCC<DropdownProps>, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement | null>();
  elementRef.current = containerRef;
  const DropdownRef = useLazyRef<FCC<DropdownProps>>(
    (): FCC<DropdownProps> => {
      const Component: FCC<DropdownProps> = (props) => {
        console.log(elementRef.current);
        return <Dropdown {...props} refElement={elementRef.current} />;
      };
      return Component;
    },
  );
  return [DropdownRef.current, setContainerRef];
};

export default useDropdown;

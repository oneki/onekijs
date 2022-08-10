import { FCC } from 'onekijs-framework';
import React from 'react';
import styled from 'styled-components';
import { addClassname } from '../../utils/style';
import { colStyle } from './style';
import { ColProps } from './typings';

const ColComponent: FCC<ColProps> = ({ className, size, xs, sm, md, lg, xl, offset, ...props }) => {
  const classNames = [`o-col-${size}`, 'o-col'];
  if (xs !== undefined) {
    classNames.unshift(`o-col-xs-${xs}`);
  }
  if (sm !== undefined) {
    classNames.unshift(`o-col-sm-${sm}`);
  }
  if (md !== undefined) {
    classNames.unshift(`o-col-md-${md}`);
  }
  if (lg !== undefined) {
    classNames.unshift(`o-col-lg-${lg}`);
  }
  if (xl !== undefined) {
    classNames.unshift(`o-col-xl-${xl}`);
  }

  return <div className={addClassname(classNames.join(' '), className)} {...props}></div>;
};

const Col = styled(ColComponent)`
  ${colStyle}
`;

export default Col;

import { AnonymousObject, get } from 'onekijs-framework';
import React, { FC } from 'react';
import Col from '../../grid/Col';
import Row from '../../grid/Row';
import { GridSize } from '../../grid/typings';
import usePropertiesContext from '../hooks/usePropertiesContext';
import { PropertyProps } from '../typings';

const Property: FC<PropertyProps> = React.memo(({ name, value }) => {
  const context = usePropertiesContext();
  const nameSize = context.size ?? 3;
  const valueSize = (nameSize === 12 ? 12 : 12 - nameSize) as GridSize;
  const variantValueSize: AnonymousObject<GridSize | undefined> = {};
  ['sm', 'md', 'lg', 'xl'].forEach((variant) => {
    const nameSize = get(context, variant);
    variantValueSize[variant] =
      nameSize === undefined ? undefined : ((nameSize === 12 ? 12 : 12 - nameSize) as GridSize);
  });
  return (
    <Row className="o-property" gapX="10px" gapY="0px">
      <Col size={nameSize} sm={context.sm} md={context.md} lg={context.lg} xl={context.xl} className="o-property-name">
        {name}
      </Col>
      <Col
        size={valueSize}
        sm={variantValueSize.sm}
        md={variantValueSize.md}
        lg={variantValueSize.lg}
        xl={variantValueSize.xl}
        className="o-property-value"
      >
        {value}
      </Col>
    </Row>
  );
});

Property.displayName = 'Property';

export default Property;

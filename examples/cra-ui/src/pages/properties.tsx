import { Card, ComponentStyle, Properties } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const propertiesStyle: ComponentStyle<{}> = () => {
  return css``;
};

const FilledTag = styled.span`
  border-radius: 5px;
  background-color: hsl(198,100%,32%);
  color: white;
  padding: 5px 10px;
`

const BorderTag = styled.span`
  border-radius: 5px;
  border: 1px solid hsl(198,100%,32%);
  padding: 5px 10px;
`

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const properties = {
    'Type': <FilledTag>Task</FilledTag>,
    'Version': <BorderTag>2.11.RELEASE</BorderTag>,
    'Uri': 'docker:springcloudtask/timestamp-task:2.1.1.RELEASE',
    'Metadata Uri': 'N/A',
    'Version(s)': 1
  }

  return (
    <Card title="properties" open={true} >
      <Properties properties={properties} size={12} sm={3} lg={2} xl={1} />
    </Card>
  );
};

export const PropertiesPage = styled(Page)`
  ${propertiesStyle}
`;

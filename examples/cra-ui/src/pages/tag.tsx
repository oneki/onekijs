import { Tag, ComponentStyle } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const tagStyle: ComponentStyle<{}> = () => {
  return css``;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return <>
      <div style={{marginBottom: '15px'}}>{['primary', 'secondary', 'danger', 'success', 'warning', 'light', 'darker', 'info'].map((kind) => <Tag size="small" kind={kind as any}>Tag {kind}</Tag>)}</div>
      <div style={{marginBottom: '15px'}}>{['primary', 'secondary', 'danger', 'success', 'warning', 'light', 'darker', 'info'].map((kind) => <Tag size="medium" kind={kind as any}>Tag {kind}</Tag>)}</div>
      <div>{['primary', 'secondary', 'danger', 'success', 'warning', 'light', 'darker', 'info'].map((kind) => <Tag size="large" kind={kind as any}>Tag {kind}</Tag>)}</div>
    </>;
};

export const TagPage = styled(Page)`
  ${tagStyle}
`;

import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { backgroundColor } from '../../styles/background';

export const Select: FC<any> = ({ className }) => {
  return <button className={className}>Toto</button>;
};

export const SelectButton = styled(Select)`
  ${backgroundColor('primary')}
`;

Select.propTypes = {
  className: PropTypes.string,
};

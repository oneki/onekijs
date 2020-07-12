import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bg } from '../../styles/bg';

export const Select = ({ className }) => {
  return <button className={className}>Toto</button>;
};

export const SelectButton = styled(Select)`
  ${bg('primary')}
`;

Select.propTypes = {
  className: PropTypes.string,
};

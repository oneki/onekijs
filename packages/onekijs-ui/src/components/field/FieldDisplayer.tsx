import styled from 'styled-components';
import FieldDisplayerComponent from './components/FieldDisplayerComponent';
import { fieldDisplayerStyle } from './style';

const FieldDisplayer = styled(FieldDisplayerComponent)`
  ${fieldDisplayerStyle}
`;

export default FieldDisplayer;

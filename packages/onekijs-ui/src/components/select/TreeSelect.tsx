import styled from 'styled-components';
import TreeSelectComponent from './components/TreeSelectComponent';
import selectStyle from './style';

const TreeSelect = styled(TreeSelectComponent)`
  ${selectStyle}
`;

export default TreeSelect as typeof TreeSelectComponent;

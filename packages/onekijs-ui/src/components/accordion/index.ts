import styled from 'styled-components';
import AccordionComponent from './components/AccordionComponent';
import { accordionStyle } from './style';

/**
 * Test Description
 *
 * @group Accordion
 * @cateogry Components
 *
 * @example
 * ```tsx
 * <Accordion multiActive="false" />
 * ```
 *
 * @see AccordionComponent
 * @remarks #styled#
 */
const Accordion = styled(AccordionComponent)`
  ${accordionStyle}
`;

export default Accordion;

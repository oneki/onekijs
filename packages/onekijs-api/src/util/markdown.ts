import ParsedElement from '../lib/context';
import { getDocusaurusPath } from './file';

export function resultType(element: ParsedElement) {
  let link = `[${element.name}](${getDocusaurusPath(element)})`;
  if (element.typeParameters.length > 0) {
    link += '<';
    element.typeParameters.forEach((typeParameter, i) => {
      if (i > 0) link += ', ';
      link += typeParameter.name;
    });
    link += '>';
  }
  return link;
}

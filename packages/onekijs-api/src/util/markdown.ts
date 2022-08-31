import ParsedElement, { Props } from '../lib/context';
import { getDocusaurusPath } from './file';

export function depth(props: Props[], initialDepth = 1): number {
  let maxDepth = initialDepth;
  for (const prop of props) {
    if (prop.toDocument && prop.type instanceof ParsedElement) {
      const children = prop.type.props;
      if (children.length > 0) {
        const childrenDepth = depth(children, initialDepth + 1);
        maxDepth = Math.max(childrenDepth, maxDepth);
      }
    }
  }

  return maxDepth;
}

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

export type Filter = 'Method' | 'Property';
export type PropsTableType = 'Components' | 'Function' | 'Method' | 'Enumeration';
export function propsTable(props: Props[], type: PropsTableType, filter?: Filter): string {
  const propsTableDepth = depth(props);

  return `| ${propLabel(type)} ${headerDepth(propsTableDepth, '|   ')}| ${headerType(type)} | Description |
| --------- ${headerDepth(propsTableDepth, '| -- ')}| ---- | ----------- |`;
}

function headerDepth(depth: number, str: string) {
  return [...Array(depth).keys()].map((i) => str).join('');
}

function headerType(type: PropsTableType) {
  if (type === 'Enumeration') {
    return 'Value';
  } else if (type === 'Function' || type === 'Method') {
    return 'Signature';
  } else {
    return 'Type';
  }
}

function propLabel(type: PropsTableType) {
  let propLabel = 'Properties';
  if (type === 'Function' || type === 'Method') {
    propLabel = 'Parameters';
  }
  return propLabel;
}

function propName(prop: Props) {
  if (prop.defaultValue !== undefined) return prop.name;
  if (prop.flags.isOptional === true) return prop.name;
  return `**${prop.name}**`;
}

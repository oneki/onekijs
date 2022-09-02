import { ReflectionKind } from 'typedoc';
import { getAbsoluteFilepath, writeFileSyncRecursive } from '../util/file';
import { resultType } from '../util/markdown';
import ParsedElement, { Props } from './context';

const isMandatoryProp = (prop: Props) => {
  if (prop.defaultValue !== undefined) return false;
  if (prop.flags.isOptional === true) return false;
  return true;
};

export class MarkdownBuilder {
  constructor(public element: ParsedElement, public basePath: string, public markdown = '') {}

  public build() {
    // build markdown
    this.markdownMetadata().signatures().description().remark().example().section1().section2().typeParameters();
    // write markdown to file
    this.writeString(getAbsoluteFilepath(this.element), this.markdown);
  }

  writeString(path: string, data: string) {
    writeFileSyncRecursive(path, data, {
      flag: 'w',
    });
  }

  private markdownMetadata() {
    this.markdown += `---
id: ${this.element.name}
title: ${this.element.name}
sidebar_label: ${this.element.name}
---`;
    return this;
  }

  private typeParameters() {
    const typeParameters = this.element.typeParameters;
    let markdown = '';
    if (typeParameters.length > 0) {
      markdown += `\n\n### Type parameters
| Type | Description |
| ---- | ----------- |
`;
      typeParameters.forEach((typeParameter) => {
        markdown += `| ${typeParameter.name} | ${typeParameter.description} |\n`;
      });
      markdown += '\n';
    }
    return markdown;
  }

  private example() {
    const example = this.element.example;
    let markdown = '';
    if (example) {
      markdown += `\n\n#### Example\n\n${example}`;
    }
    this.markdown += markdown;
    return this;
  }

  private depth(props: Props[], initialDepth = 1): number {
    let maxDepth = initialDepth;
    for (const prop of props) {
      if (prop.toDocument && prop.type instanceof ParsedElement) {
        const children = prop.type.props;
        if (children.length > 0) {
          const depth = this.depth(children, initialDepth + 1);
          maxDepth = Math.max(depth, maxDepth);
        }
      }
    }

    return maxDepth;
  }

  private buildHeaderDepth(depth: number, str: string) {
    let result = '';
    for (let i = 1; i < depth; i++) {
      result += str;
    }
    return result;
  }

  private buildProp(prop: Props, maxDepth: number, depth = 1) {
    let result = '';
    for (let i = 1; i < depth; i++) {
      result += '| ';
    }
    result += `| ${this.handleMandatoryProp(prop)} `;
    for (let i = depth; i < maxDepth; i++) {
      result += '| ';
    }
    result += `| ${this.typeAsString(prop).replace(/\|/g, '\\|').replace(/>/g, '\\>')} | ${this.buildPropDescription(
      prop,
    )} |\n`;

    if (prop.toDocument && prop.type instanceof ParsedElement) {
      const children = prop.type.props;
      if (children) {
        children.forEach((child) => {
          result += this.buildProp(child, maxDepth, depth + 1);
        });
      }
    }
    return result;
  }

  private buildPropDescription(prop: Props) {
    let markdown = prop.description;
    if (prop.example !== undefined && prop.example !== '') {
      if (markdown.length > 0) markdown += '<br/><br/>';
      markdown += `**Example:** ${prop.example}`;
    }
    if (prop.defaultValue !== undefined && prop.defaultValue !== '') {
      if (markdown.length > 0) markdown += '<br/><br/>';
      markdown += `**Defaults to:** ${prop.defaultValue}`;
    }
    return markdown;
  }

  private typeAsString(prop: Props) {
    if (typeof prop.type === 'string') {
      return prop.type;
    }
    return prop.type.name; // TODO build full type
  }

  private handleMandatoryProp(prop: Props) {
    if (isMandatoryProp(prop)) return `**${prop.name}**`;
    return prop.name;
  }

  private sortProps(props: Props[]) {
    return props.sort(function (prop1, prop2) {
      const isMandatoryProp1 = isMandatoryProp(prop1);
      const isMandatoryProp2 = isMandatoryProp(prop2);

      if (isMandatoryProp1 && !isMandatoryProp2) return -1;
      if (isMandatoryProp2 && !isMandatoryProp1) return 1;
      return prop1.name.localeCompare(prop2.name);
    });
  }

  private section1() {
    const label = this.sectionLabel(1);
    this.markdown += `\n\n### ${label}\n\n`;
    if (this.element.type !== 'Class') {
      this.markdown += `<font size="2"><i>(Mandatory ${label.toLocaleLowerCase()} are in bold)</i></font>\n\n`;
    }

    let props = this.sortProps(this.element.props);
    props = props.filter((prop) => {
      if (prop.flags.isPrivate || prop.flags.isProtected) return false;
      if (this.element.type === 'Class') {
        return prop.kind === 'Property' || prop.kind === ReflectionKind.Property;
      }
      return true;
    });

    const depth = this.depth(props);
    this.markdown += `| ${label} ${this.buildHeaderDepth(depth, '|   ')}| ${this.typeLabel(1)} | Description |\n`;
    this.markdown += `| --------- ${this.buildHeaderDepth(depth, '| -- ')}| ---- | ----------- |\n`;
    props.forEach((prop) => {
      this.markdown += this.buildProp(prop, depth);
    });
    return this;
  }

  private section2() {
    const label = this.sectionLabel(2);
    this.markdown += `\n\n### ${label}\n\n`;
    let props = this.sortProps(this.element.props);
    if (this.element.type === 'Function' || this.element.type === 'Method') {
      // We only display properties
      this.markdown += this.return();
      return this;
    } else if (this.element.type === 'Class') {
      // We only display properties
      props = props.filter((prop) => {
        if (prop.flags.isPrivate || prop.flags.isProtected) return false;
        return prop.kind === 'Method' || prop.kind === ReflectionKind.Method;
      });
    } else {
      return this;
    }

    const depth = this.depth(props);
    this.markdown += `| ${label} ${this.buildHeaderDepth(depth, '|   ')}| ${this.typeLabel(2)} | Description |\n`;
    this.markdown += `| --------- ${this.buildHeaderDepth(depth, '| -- ')}| ---- | ----------- |\n`;
    props.forEach((prop) => {
      this.markdown += this.buildProp(prop, depth);
    });
    return this;
  }

  private sectionLabel(idx: number) {
    let label = 'Properties';
    if (idx === 1) {
      if (this.element.type === 'Function') {
        label = 'Parameters';
      }
    } else if (idx === 2) {
      if (this.element.type === 'Function') {
        label = 'Return';
      } else if (this.element.type === 'Class') {
        label = 'Methods';
      }
    }

    return label;
  }

  private typeLabel(idx: number) {
    if (idx === 1) {
      if (this.element.type === ReflectionKind.Enum) {
        return 'Value';
      } else {
        return 'Type';
      }
    } else if (idx === 2) {
      if (this.element.type === 'Class') {
        return 'Signature';
      } else {
        return 'Type';
      }
    }
    return 'Type';
  }

  private return() {
    let markdown = '';
    const returns = this.element.returns;
    if (returns) {
      markdown += '\n\nThe return is of type <code>';
      if (typeof returns === 'string') {
        markdown += returns.replace(/>/g, '\\>');
      } else if (returns instanceof ParsedElement) {
        markdown += resultType(returns).replace(/>/g, '\\>');
      } else {
        // TODO handle array result type
      }
      markdown += '</code>';
    }
    return markdown;
  }

  private remark() {
    let markdown = '';
    const remarks = this.element.remarks;
    if (remarks) {
      markdown += `\n\n:::note Note\n${remarks}\n:::`;
    }
    this.markdown += markdown;
    return this;
  }

  private description() {
    this.markdown += `\n\n${this.element.description}`;
    return this;
  }

  private signatures() {
    let markdown = '';
    const signatures = this.element.signatures;
    if (signatures.length > 0) {
      markdown += `\n\n`;
      markdown += '```tsx\n';
      signatures.forEach((signature) => {
        markdown += `${signature}\n`;
      });
      markdown += '```\n<br/>';
    }
    this.markdown += markdown;
    return this;
  }
}

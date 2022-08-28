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
  constructor(public element: ParsedElement, public basePath: string) {}

  public build() {
    this.sortProps(this.element.props);
    const markdown = `${this.markdownMetadata()}${this.signatures()}
    
${this.element.description}${this.remark()}${this.example()}

${this.inputTitle()}

${this.headerProps(this.element.props)}
${this.props(this.element.props)}${this.return()}${this.typeParameters()}
`;

    this.writeString(getAbsoluteFilepath(this.element), markdown);
  }

  writeString(path: string, data: string) {
    writeFileSyncRecursive(path, data, {
      flag: 'w',
    });
  }

  private headerProps(props: Props[]) {
    const depth = this.depth(props);
    return `| ${this.inputLabel()} ${this.buildHeaderDepth(depth, '|   ')}| ${this.headerTypelabel()} | Description |
| --------- ${this.buildHeaderDepth(depth, '| -- ')}| ---- | ----------- |`;
  }

  private markdownMetadata() {
    return `---
id: ${this.element.name}
title: ${this.element.name}
sidebar_label: ${this.element.name}
---`;
  }

  private headerTypelabel() {
    if (this.element.type === ReflectionKind.Enum) {
      return 'Value';
    } else {
      return 'Type';
    }
  }

  private props(props: Props[]) {
    let markdown = '';
    props.forEach((prop) => {
      markdown += this.buildProp(prop, this.depth(props));
    });
    return markdown;
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
    return markdown;
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
    return prop.description;
  }

  private typeAsString(prop: Props) {
    if (typeof prop.type === 'string') {
      return prop.type;
    }
    return prop.type.name; // TODO build full type
  }

  // private getOutputFilename() {
  //   let path = '';
  //   if (this.element.groups[0]) {
  //     path += `${this.element.groups[0]}/`;
  //   }
  //   if (this.element.categories[0]) {
  //     path += `${this.element.categories[0]}/`;
  //   }
  //   path += `${this.element.name}.md`;
  //   return path;
  // }

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

  private inputTitle() {
    const label = this.inputLabel();
    return `### ${label}\n\n<font size="2"><i>(Mandatory ${label.toLocaleLowerCase()} are in bold)</i></font>`;
  }

  private inputLabel() {
    let label = 'Properties';
    if (this.element.categories[0] === 'Components') {
      label = 'Properties';
    } else if (this.element.type === 'Function') {
      label = 'Parameters';
    }
    return label;
  }

  private return() {
    let markdown = '';
    const returns = this.element.returns;
    if (returns) {
      markdown += '\n\n### Return\n\nThe return is of type <code>';
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
      markdown += `\n\n:::info Remark\n${remarks}\n:::`;
    }
    return markdown;
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
    return markdown;
  }
}

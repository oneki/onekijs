import { writeFileSync } from 'fs';
import { join } from 'path';
import { Props } from './context';
import { ParsedElement } from './parser';

const isMandatoryProp = (prop: Props) => {
  if (prop.defaultValue !== undefined) return false;
  if (prop.flags.isOptional === true) return false;
  return true;
};
export class MarkdownBuilder {
  constructor(public element: ParsedElement, public basePath: string) {}

  public build() {
    let markdown = '';
    markdown += `${this.element.description}\n\n`;
    markdown += '### Inputs\n\n<font size="2"><i>(Mandatory parameters are in bold)</i></font>\n\n';
    markdown += `${this.buildHeader(this.element.props)}\n`;
    this.sortProps(this.element.props);
    this.element.props.forEach((prop) => {
      markdown += this.buildProp(prop, this.depth(this.element.props));
    });

    this.writeString(`${this.element.name}.md`, markdown);
  }

  writeString(path: string, data: string) {
    writeFileSync(join(this.basePath, path), data, {
      flag: 'w',
    });
  }

  private buildHeader(props: Props[]) {
    const depth = this.depth(props);
    let result = `| Parameter ${this.buildHeaderDepth(depth, '|   ')}| Type | Description |\n`;
    result += `| --------- ${this.buildHeaderDepth(depth, '| -- ')}| ---- | ----------- |`;
    return result;
  }

  private depth(props: Props[], initialDepth = 1): number {
    let maxDepth = initialDepth;
    for (const prop of props) {
      const children = prop.children;
      if (children) {
        const depth = this.depth(children, initialDepth + 1);
        maxDepth = Math.max(depth, maxDepth);
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
    result += `| ${prop.type.replace(/\|/g, '\\|').replace(/>/g, '\\>')} | ${this.buildPropDescription(prop)} |\n`;

    const children = prop.children;
    if (children) {
      children.forEach((child) => {
        result += this.buildProp(child, maxDepth, depth + 1);
      });
    }

    return result;
  }

  private buildPropDescription(prop: Props) {
    return prop.description;
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
}

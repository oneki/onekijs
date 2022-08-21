import { writeFileSync } from 'fs';
import { join } from 'path';
import { Props } from './context';
import { ParsedElement } from './parser';

export class MarkdownBuilder {
  constructor(public element: ParsedElement, public basePath: string) {}

  public build() {
    let markdown = '';
    markdown += `${this.element.description}\n`;
    markdown += '### Inputs\n\n<font size="1">(Mandatory parameter are in bold)</font>\n';
    markdown += `${this.buildHeader(this.element.props)}\n`;
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
    result += `| ${prop.type.replace(/\|/g, '\\|')} | ${this.buildPropDescription(prop)} |\n`;

    const children = prop.children;
    if (children) {
      children.forEach((child) => {
        result += this.buildProp(child, maxDepth, depth + 1);
      });
    }

    return result;
  }

  private buildPropDescription(prop: Props) {
    return prop.description.replace(/\n/g, '<br/>');
  }

  private handleMandatoryProp(prop: Props) {
    if (prop.defaultValue !== undefined) return prop.name;
    if (prop.flags.isOptional === true) return prop.name;
    return `**${prop.name}**`;
  }
}

import React from 'react';
import { AnonymousObject } from '../types/object';
import { set } from './object';
import { regexIndexOf } from './string';

export const extractTag = (str: string, startPos: number): [string, string, number, number] | [] => {
  const openingStart = regexIndexOf(str, /<[1-9][0-9]*>/, startPos);
  if (openingStart > -1) {
    const openingEnd = str.indexOf('>', openingStart);
    const idx = str.substring(openingStart + 1, openingEnd);

    const closingStart = str.indexOf(`</${idx}>`, openingEnd);
    const content = str.substring(openingEnd + 1, closingStart);
    return [content, idx, openingStart, closingStart + `</${idx}>`.length];
  }
  return [];
};

export const parseJsx = (
  str: string,
  ctx: AnonymousObject = {},
  startPos = 0,
): (
  | React.FunctionComponentElement<{
      key: string;
    }>
  | string
)[] => {
  const result = [];
  let count = 0;
  do {
    const [content, idx, start, end] = extractTag(str, startPos);
    if (content === undefined) {
      const element = str.substring(startPos);
      if (element.length > 0) {
        result.push(element);
      }
      break;
    }

    if (start !== undefined && start > startPos) {
      result.push(str.substring(startPos, start as number));
    }

    const childJsx = parseJsx(content, ctx);
    const el = React.cloneElement(ctx[`el-${idx}`], { key: `el-${idx}` }, childJsx);
    result.push(el);

    startPos = end as number;
    if (startPos >= str.length) break;
    if (++count > 10) break;
  } while (
    /*eslint-disable-next-line*/
    true
  );

  return result;
};

export const stringifyJsx = (reactElement: JSX.Element, ctx: AnonymousObject = {}, idx = 1): [string, number] => {
  const children: any[] = [].concat(reactElement.props.children);
  const stringifiedJsx = children.reduce((stringifiedJsx, child) => {
    if (typeof child === 'string') return `${stringifiedJsx}${child}`;
    if (React.isValidElement(child)) {
      let str = '';
      let nextIdx = 0;
      if (child.type === React.Fragment) {
        const [childStr, _] = stringifyJsx(child, ctx, idx);
        nextIdx = _;
        str = `${stringifiedJsx}${childStr}`;
      } else {
        const [childStr, _] = stringifyJsx(child, ctx, idx + 1);
        nextIdx = _;
        str = `${stringifiedJsx}<${idx}>${childStr}</${idx}>`;
      }
      ctx[`el-${idx}`] = child;
      idx = nextIdx;
      return str;
    } else {
      set(ctx, `vars.${Object.keys(child)[0]}`, Object.values(child)[0]);
      return `${stringifiedJsx}{{${Object.keys(child)[0]}}}`;
    }
  }, '');
  return [stringifiedJsx, idx];
};

import React from 'react';
import { regexIndexOf } from './string';
import { set } from './object';
import { AnonymousObject } from '@oneki/typings';

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
  const children = [].concat(reactElement.props.children);
  const str = children.reduce((accumulator, child) => {
    if (typeof child === 'string') return `${accumulator}${child}`;
    if (React.isValidElement(child)) {
      const [childStr, nextIdx] = stringifyJsx(child, ctx, idx + 1);
      const str = `${accumulator}<${idx}>${childStr}</${idx}>`;
      ctx[`el-${idx}`] = child;
      idx = nextIdx;
      return str;
    } else {
      set(ctx, `vars.${Object.keys(child)[0]}`, Object.values(child)[0]);
      return `${accumulator}{{${Object.keys(child)[0]}}}`;
    }
  }, '');
  return [str, idx];
};

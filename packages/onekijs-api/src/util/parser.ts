import { Comment, CommentDisplayPart, CommentTag } from 'typedoc/dist/lib/serialization/schema';
import ParsedElement, { Description, Props } from '../lib/context';

const getBlockTags = (tag: string, comment?: Comment): CommentTag[] => {
  if (!comment) return [];
  const blockTags = comment.blockTags;
  if (!blockTags) return [];
  return blockTags.filter((blockTag) => blockTag.tag === tag);
};

export const handleComment = (element: Description, comment?: Comment, useHtml = true) => {
  if (!comment) return;
  element.description = commentToDescription(comment, useHtml);
  element.example = blockTagToString('@example', comment, useHtml);
  element.remarks = blockTagToString('@remarks', comment, useHtml);
  element.returnComment = blockTagToString('@returns', comment, useHtml);
};

export const commentToDescription = (comment?: Comment, useHtml = true): string => {
  if (!comment) return '';
  return commentPartsToString(comment.summary, useHtml);
};

export const commentPartsToString = (comment: CommentDisplayPart[], useHtml = true): string => {
  return comment.reduce((description, summary) => {
    let text = summary.text;
    if (useHtml) {
      text = text.replace(/>/g, '\\>');
    }

    if (summary.kind === 'text') {
      if (useHtml) {
        text = text.replace(/\n/g, '<br/>');
      } else {
        text = text.replace(/\n\n/g, '____double_new_line____');
        text = text.replace(/\n/g, '  \n');
        text = text.replace(/____double_new_line____/g, '\n\n');
      }
    } else if (summary.kind === 'code' && useHtml) {
      text = text.replace('```\n', '<pre>');
      text = text.replace('\n```', '</pre>');
      text = text.replace('`', '<code>');
      text = text.replace('`', '</code>');
      text = text.replace(/\n/g, '<br/>');
    }
    return `${description}${text}`;
  }, '');
};

export const blockTagToString = (blockTag: string, comment?: Comment, useHtml = true): string => {
  const blocks = getBlockTags(blockTag, comment).flatMap((commentTag) => commentTag.content);
  return commentPartsToString(blocks, useHtml);
};

export const commentToExample = (comment?: Comment, useHtml = true): string => {
  const exampleBlocks = getBlockTags('@example', comment);
  return exampleBlocks.reduce((description, blockTag) => {
    const example = blockTag.content.reduce((example, content) => {
      return `${example}${content.text}`;
    }, '');
    return `${description}${example}`;
  }, '');
};

export const isToDocument = (comment?: Comment): boolean => {
  const blocks = getBlockTags('@remarks', comment);
  return blocks.length > 0 && blocks[0].content.length > 0 && blocks[0].content[0].text === '#doc#';
};

export const emptyProp = () => {
  const prop: Props = {
    description: '',
    flags: {},
    name: '',
    type: '',
  };
  return prop;
};

import { Comment, CommentTag } from 'typedoc/dist/lib/serialization/schema';

const getBlockTags = (tag: string, comment?: Comment): CommentTag[] => {
  if (!comment) return [];
  const blockTags = comment.blockTags;
  if (!blockTags) return [];
  return blockTags.filter((blockTag) => blockTag.tag === tag);
};

export const commentToDescription = (comment?: Comment): string => {
  if (!comment) return '';
  return comment.summary.reduce((description, summary) => {
    let text = summary.text;
    text = text.replace(/>/g, '\\>');
    if (summary.kind === 'text') {
      text = text.replace(/\n/g, '<br/>');
    } else if (summary.kind === 'code') {
      text = text.replace('```\n', '<pre>');
      text = text.replace('\n```', '</pre>');
      text = text.replace('`', '<code>');
      text = text.replace('`', '</code>');
      text = text.replace(/\n/g, '<br/>');
    }
    return `${description}${text}`;
  }, '');
};

export const commentToExample = (comment?: Comment): string => {
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

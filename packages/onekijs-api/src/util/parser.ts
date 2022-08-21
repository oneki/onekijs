import { Comment } from 'typedoc/dist/lib/serialization/schema';

export const commentToDescription = (comment?: Comment): string => {
  if (!comment) return '';
  return comment.summary.reduce((description, summary) => {
    let text = summary.text;
    if (summary.kind === 'text') {
      text = text.replace(/\n/g, '<br/>');
    } else if (summary.kind === 'code') {
      text = text.replace('```', '<pre>');
      text = text.replace('```', '</pre>');
      text = text.replace('`', '<code>');
      text = text.replace('`', '</code>');
      text = text.replace(/\n/g, '<br/>');
    }
    return `${description}${text}`;
  }, '');
};

export const commentToExample = (comment?: Comment): string => {
  if (!comment) return '';
  const blockTags = comment.blockTags;
  if (!blockTags) return '';
  const exampleBlocks = blockTags.filter((blockTag) => blockTag.tag === '@example');
  return exampleBlocks.reduce((description, blockTag) => {
    const example = blockTag.content.reduce((example, content) => {
      return `${example}${content.text}`;
    }, '');
    return `${description}${example}`;
  }, '');
};

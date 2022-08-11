import { CursorProperty } from 'csstype';

export const clearSelection = (): void => {
  const getSelection = window.getSelection;
  if (getSelection !== null) {
    const selection = getSelection();
    if (selection !== null) selection.removeAllRanges();
  }
};

export const forceCursor = (cursor?: CursorProperty): void => {
  document.body.style.cursor = cursor ? `${cursor}` : '';
};

//cursor: ${props.area === 'header' ? 's' : 'n'}-resize;

export const getTranslateXY = (element: Element): { x: number; y: number } => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    x: matrix.m41,
    y: matrix.m42,
  };
};

export const markBodyAsUnselectable = (): void => {
  document.body.style.userSelect = 'none';
};

export const markBodyAsSelectable = (): void => {
  document.body.style.userSelect = '';
};

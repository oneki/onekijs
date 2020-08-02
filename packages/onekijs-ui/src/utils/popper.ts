import { Modifier } from '@popperjs/core';

const refWidth = (type: string): Partial<Modifier<string, object>> => {
  return {
    name: "sameWidth",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      (state.elements.popper.style as any)[type] = `${
        state.elements.reference.getBoundingClientRect().width
      }px`;
    }
  } as Partial<Modifier<string, object>>;
}

export const sameWidthPopperModifier = refWidth('width');
export const minWidthPopperModifier = refWidth('minWidth');
export const maxWidthPopperModifier = refWidth('maxWidth');
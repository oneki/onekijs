import { DeclarationReflection } from 'typedoc/dist/lib/serialization/schema';

type GroupType = 'Components' | 'Hooks' | 'Other';

export interface IndexedElement {
  element: DeclarationReflection;
  types: GroupType[];
}

export class Indexer {
  elements: IndexedElement[];

  constructor() {
    this.elements = [];
  }

  buildIndexes(api: DeclarationReflection) {
    const children = api.children;
    const groups = api.groups;
    if (children) {
      children.forEach((child) => {
        this.elements[child.id] = {
          element: child,
          types: [],
        };
      });
    }

    if (groups) {
      groups.forEach((group) => {
        if (group.title === 'Components' || group.title === 'Hooks') {
          group.children?.forEach((child) => {
            const element = this.elements[child];
            if (!element) {
              console.error(`element with ID ${child} not found in index. This is not normal`);
              return;
            }
            element.types = group.title as any;
          });
        }
      });
    }
  }

  getElementById(id: number) {
    return this.elements[id]?.element;
  }

  getTypesById(id: number) {
    return this.elements[id]?.types;
  }

  isComponent(id: number): boolean {
    return this.isPartOfGroup(id, 'Components');
  }

  isHook(id: number): boolean {
    return this.isPartOfGroup(id, 'Hooks');
  }

  isPartOfGroup(id: number, type: GroupType): boolean {
    const indexedElement = this.elements[id];
    if (!indexedElement) return false;
    if (indexedElement.types.includes(type)) return true;
    return false;
  }
}

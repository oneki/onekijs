import { DeclarationReflection } from 'typedoc/dist/lib/serialization/schema';
import ParsedElement from './context';

type CategoryType = 'Components' | 'Hooks' | 'Other';

export interface IndexedElement {
  element: DeclarationReflection;
  groups: string[];
  categories: string[];
}

export class Indexer {
  elements: IndexedElement[];
  elementsByName: any;
  parsedElements: ParsedElement[];

  constructor() {
    this.elements = [];
    this.parsedElements = [];
    this.elementsByName = {};
  }

  populateTopApis(element: DeclarationReflection, apis: DeclarationReflection[]) {
    if (element.groups) {
      apis.push(element);
    } else if (element.children) {
      element.children.forEach((child) => {
        this.populateTopApis(child, apis);
      })
    }
  }

  buildIndexes(mergedApis: DeclarationReflection) {
    const apis: DeclarationReflection[] = [];
    this.populateTopApis(mergedApis, apis);
    apis.forEach((api) => {
      this.buildApiIndexes(api);
    })
  }

  buildApiIndexes(api: DeclarationReflection) {
    const children = api.children;
    const groups = api.groups;
    if (children) {
      children.forEach((child) => {
        this.elements[child.id] = {
          element: child,
          groups: [],
          categories: [],
        };
        this.elementsByName[child.name] = {
          element: child,
          groups: [],
          categories: [],
        };
      });
    }

    if (groups) {
      groups.forEach((group) => {
        group.children?.forEach((child) => {
          const element = this.elements[child];
          if (!element) {
            console.error(`element with ID ${child} not found in index. This is not normal`);
            return;
          }
          element.groups.push(group.title);
        });
        group.categories?.forEach((category) => {
          category.children?.forEach((child) => {
            const element = this.elements[child];
            if (!element) {
              console.error(`element with ID ${child} not found in index. This is not normal`);
              return;
            }
            element.categories.push(category.title);
          });
        });
      });
    }
  }

  getCategoryById(id: number) {
    return this.elements[id]?.categories[0];
  }

  getCategoriesById(id: number) {
    return this.elements[id]?.categories;
  }

  getElementById(id: number) {
    return this.elements[id]?.element;
  }

  getTypeById(id: number) {
    return this.elements[id]?.groups[0];
  }

  getTypesById(id: number) {
    return this.elements[id]?.groups;
  }

  isComponent(id: number): boolean {
    return this.isPartOfCategory(id, 'Components');
  }

  isHook(id: number): boolean {
    return this.isPartOfCategory(id, 'Hooks');
  }

  isPartOfCategory(id: number, type: CategoryType): boolean {
    const indexedElement = this.elements[id];
    if (!indexedElement) return false;
    if (indexedElement.categories.includes(type)) return true;
    return false;
  }
}

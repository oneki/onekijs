import { ReflectionKind } from 'typedoc';
import { ReflectionFlags } from 'typedoc/dist/lib/serialization/schema';

export interface Description {
  name: string;
  description: string;
  example?: string;
  defaultValue?: string;
  remarks?: string;
  returnComment?: string;
}
export interface Props extends Description {
  flags: ReflectionFlags;
  type: string | ParsedElement;
  kind: string | ReflectionKind;
  toDocument?: boolean;
}

export interface TypeParameter {
  name: string;
  description: string;
}

export class ParsedElement implements Description {
  props: Props[];
  typeParameters: TypeParameter[];
  signatures: string[];
  returns?: string | ParsedElement;
  description: string;
  example?: string;
  defaultValue?: string;
  remarks?: string;
  returnComment?: string;
  groups: string[];
  categories: string[];

  constructor(public name: string, public type: string | ReflectionKind) {
    this.props = [];
    this.description = '';
    this.groups = [];
    this.categories = [];
    this.typeParameters = [];
    this.signatures = [];
  }

  // addActiveProp(prop: Props) {
  //   const activeProp = this.getActiveProp();
  //   if (activeProp) {
  //     const children = activeProp.children;
  //     if (children) {
  //       children.push(prop);
  //     } else {
  //       activeProp.children = [prop];
  //     }
  //   }
  // }

  // appendActiveType = (type: string) => {
  //   const activeProp = this.getActiveProp();
  //   if (activeProp) {
  //     activeProp.type = `${activeProp.type}${type}`;
  //   }
  // };

  // getActiveProp() {
  //   const prop = this.props.at(-1);
  //   if (prop) {
  //     return this.getActiveChildrenProp(prop);
  //   }
  //   return prop;
  // }

  // private getActiveChildrenProp(prop: Props) {
  //   const children = prop?.children;
  //   if (children) {
  //     return children.at(-1);
  //   }
  //   return prop;
  // }
}

export default ParsedElement;

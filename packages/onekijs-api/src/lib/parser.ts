import { ReflectionKind } from 'typedoc';
import {
  DeclarationReflection,
  IntersectionType,
  IntrinsicType,
  ReferenceType,
  ReflectionType,
  SomeType,
  UnionType,
} from 'typedoc/dist/lib/serialization/schema';
import { commentToDescription, commentToExample, isToDocument } from '../util/parser';
import ElementContext, { Props } from './context';
import { Indexer } from './indexer';

export type ParsedElement = Omit<ElementContext, 'propsLevel'>;
type SpecialType = 'props' | 'toDocument';

export class ElementParser {
  private context: ElementContext;

  constructor(public indexer: Indexer) {
    this.context = new ElementContext('');
  }

  parse(subject: DeclarationReflection): ParsedElement {
    this.context.name = subject.name;
    this.handleDeclarationReflection(subject);
    if (this.indexer.isComponent(subject.id)) {
      this.handleComponent(subject);
    } else {
      // this.handleDeclarationReflection(subject);
    }
    return this.context;
  }

  protected handleComponent(container: DeclarationReflection) {
    const signatures = container.signatures;
    if (signatures && signatures.length > 0) {
      this.context.description = commentToDescription(signatures[0].comment);
      const parameters = signatures[0].parameters;
      if (parameters) {
        parameters.forEach((p) => {
          if (p.kind === ReflectionKind.Parameter && p.name === 'props') {
            const type = p.type;
            if (type) this.handleType(type, 'props');
          }
        });
      }
    }
  }

  protected handleDeclarationReflection(element: DeclarationReflection, specialType?: SpecialType) {
    const children = element.children || [];
    const type = element.type;
    if (!specialType && isToDocument(element.comment)) {
      specialType = 'toDocument';
    }
    if (element.kind === ReflectionKind.TypeLiteral) {
      const activeProp = this.context.getActiveProp();
      children.forEach((child) => {
        if (specialType === 'props') {
          // this is a property of a component, let's add a prop in the context
          this.context.props.push({
            name: child.name,
            flags: child.flags,
            type: '',
            description: commentToDescription(child.comment),
            example: commentToExample(child.comment),
          });
          this.handleDeclarationReflection(child);
        } else if (specialType === 'toDocument') {
          // this is a property of a component, let's add a prop in the context
          const prop: Props = {
            name: child.name,
            flags: child.flags,
            type: '',
            description: commentToDescription(child.comment),
            example: commentToExample(child.comment),
          };
          if (activeProp) {
            const children = activeProp.children;
            if (children) {
              children.push(prop);
            } else {
              activeProp.children = [prop];
            }
          }
          this.handleDeclarationReflection(child);
        } else {
          this.handleDeclarationReflection(child, specialType);
        }
        // else if (specialType === 'toDocument') {
        //   // this is property of a component of type object (example 'options')
        //   // that we wants to document on the same page as the other props of the
        //   // component
        //   if (specialType === 'toDocument') {
        //     const activeProp = this.context.getActiveProp();
        //     if (activeProp) {
        //     }
        //   }
        // }
      });
    } else if (element.kind === ReflectionKind.TypeAlias || element.kind === ReflectionKind.Property) {
      if (type) {
        this.handleType(type, specialType);
      }
    }
  }

  protected handleIntersection(element: IntersectionType, specialType?: SpecialType) {
    const types = element.types;
    types.forEach((type) => {
      this.handleType(type, specialType);
    });
  }

  protected handleIntrinsic(element: IntrinsicType) {
    this.context.appendActiveType(element.name);
  }

  protected handleReferenceType(element: ReferenceType) {
    const id = element.id;
    if (id && this.indexer.getElementById(id)) {
      this.context.appendActiveType(`[${element.name}](./${element.name})`);
    } else {
      this.context.appendActiveType(element.name);
    }
    const typeArguments = element.typeArguments;
    if (typeArguments) {
      // this is a type with generic like React.FC<...>
      this.context.appendActiveType('<');
      typeArguments.forEach((typeArgument) => {
        this.handleType(typeArgument);
      });
      this.context.appendActiveType('>');
    }
  }

  protected handleReflection(element: ReflectionType, specialType?: SpecialType) {
    const declaration = element.declaration;
    if (declaration) {
      this.handleDeclarationReflection(declaration, specialType);
    }
  }

  protected handleType(type: SomeType, specialType?: SpecialType) {
    if (type.type === 'reference') {
      let element: DeclarationReflection | null = null;
      if (specialType === 'props' || specialType === 'toDocument') {
        const id = type.id || 0;
        element = this.indexer.getElementById(id);
      }
      if (element) {
        this.handleDeclarationReflection(element, specialType);
      } else {
        this.handleReferenceType(type);
      }
    } else if (type.type === 'reflection') {
      this.handleReflection(type, specialType);
    } else if (type.type === 'intersection') {
      this.handleIntersection(type, specialType);
    } else if (type.type === 'union') {
      this.handleUnion(type, specialType);
    } else if (type.type === 'intrinsic') {
      this.handleIntrinsic(type);
    }
  }

  protected handleUnion(element: UnionType, specialType?: SpecialType) {
    const types = element.types;
    types.forEach((type, index) => {
      if (index > 0) {
        this.context.appendActiveType(' | ');
      }
      this.handleType(type, specialType);
    });
  }
}

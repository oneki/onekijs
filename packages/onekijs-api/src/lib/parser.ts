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
import { commentToDescription, commentToExample } from '../util/parser';
import ElementContext from './context';
import { Indexer } from './indexer';

export type ParsedElement = Omit<ElementContext, 'propsLevel'>;

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
    console.log(JSON.stringify(this.context));
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
            this.context.propsLevel = true;
            const type = p.type;
            if (type) this.handleType(type);
          }
        });
      }
    }
  }

  protected handleDeclarationReflection(element: DeclarationReflection) {
    const children = element.children || [];
    const type = element.type;
    if (element.kind === ReflectionKind.TypeLiteral) {
      const isPropsLevel = this.context.propsLevel;
      this.context.propsLevel = false;
      children.forEach((child) => {
        if (isPropsLevel) {
          // this is a property of a component, let's add a prop in the context
          this.context.props.push({
            name: child.name,
            flags: child.flags,
            type: '',
            description: commentToDescription(child.comment),
            example: commentToExample(child.comment),
          });
        }
        this.handleDeclarationReflection(child);
      });
    } else if (element.kind === ReflectionKind.TypeAlias || element.kind === ReflectionKind.Property) {
      if (type) {
        this.handleType(type);
      }
    }
  }

  protected handleIntersection(element: IntersectionType) {
    const types = element.types;
    types.forEach((type) => {
      this.handleType(type);
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

  protected handleReflection(element: ReflectionType) {
    const declaration = element.declaration;
    if (declaration) {
      this.handleDeclarationReflection(declaration);
    }
  }

  protected handleType(type: SomeType) {
    if (type.type === 'reference') {
      if (this.context.propsLevel) {
        // This is the definition of a component's props
        // we follow the link to handle it completely
        const id = type.id || 0;
        const element = this.indexer.getElementById(id);
        if (element) {
          this.handleDeclarationReflection(element);
        } else {
          this.handleReferenceType(type);
        }
      } else {
        this.handleReferenceType(type);
      }
    } else if (type.type === 'reflection') {
      this.handleReflection(type);
    } else if (type.type === 'intersection') {
      this.handleIntersection(type);
    } else if (type.type === 'union') {
      this.handleUnion(type);
    } else if (type.type === 'intrinsic') {
      this.handleIntrinsic(type);
    }
  }

  protected handleUnion(element: UnionType) {
    const types = element.types;
    types.forEach((type, index) => {
      if (index > 0) {
        this.context.appendActiveType(' | ');
      }
      this.handleType(type);
    });
  }
}

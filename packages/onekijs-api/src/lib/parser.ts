import { Reflection, ReflectionKind } from 'typedoc';
import {
  Comment,
  DeclarationReflection,
  IntersectionType,
  IntrinsicType,
  LiteralType,
  ParameterReflection,
  ReferenceType,
  ReflectionType,
  SignatureReflection,
  SomeType,
  UnionType,
} from 'typedoc/dist/lib/serialization/schema';
import { getDocusaurusPath } from '../util/file';
import { commentToDescription, commentToExample, isToDocument } from '../util/parser';
import ElementContext, { Props } from './context';
import { IndexedElement, Indexer } from './indexer';

type SpecialType = 'component' | 'element' | 'attributeToDocument';

export class ElementParser {
  private context: ElementContext;

  constructor(public indexer: Indexer) {
    this.context = new ElementContext('', ReflectionKind.All);
  }

  parse(id: number): ElementContext {
    const indexedElement = this.indexer.elements[id];
    const subject = indexedElement.element;
    // Check if we have not already processed this item
    const indexedParsedElement = this.indexer.parsedElements[subject.id];
    if (indexedParsedElement) return indexedParsedElement;

    // Let's proccess this item
    this.context.name = subject.name;
    this.context.type = subject.kindString || subject.kind;
    this.context.groups = indexedElement.groups;
    this.context.categories = indexedElement.categories;
    let specialType: SpecialType;

    if (this.indexer.isComponent(subject.id)) {
      specialType = 'component';
    } else {
      specialType = 'element';
    }

    this.handleDeclarationReflection(subject, specialType);

    // if (this.indexer.isComponent(subject.id)) {
    //   this.handleComponent(subject);
    // } else {
    //   this.handleDeclarationReflection(subject);
    // }
    return this.context;
  }

  protected buildLink(basePath: string, element: ReferenceType) {
    const id = element.id;
    if (!id || !this.indexer.elements[id]) return element.name;

    // retrieve the processed element in index if it already exist
    // otherwise call parse() to process it
    const indexedParsedElement = this.indexer.parsedElements[id] || this.parse(id);
    return `[${element.name}](${getDocusaurusPath(indexedParsedElement)})`;
  }

  protected handleCallSignature(element: SignatureReflection, specialType?: SpecialType) {
    const parameters = element.parameters;
    if (parameters) {
      const activeProp = this.context.getActiveProp();
      parameters.forEach((parameter) => {
        const newSpecialType = this.handleSpecialType(parameter as any, specialType, activeProp);
        const type = parameter.type;
        if (type) {
          this.handleType(type, newSpecialType);
        }
      });
    }
    // TODO handle result;
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
            if (type) this.handleType(type, 'element');
          }
        });
      }
    }
  }

  protected handleDeclarationReflection(element: DeclarationReflection, specialType?: SpecialType) {
    const type = element.type;
    const children = element.children;
    const signatures = element.signatures;
    if (!specialType && isToDocument(element.comment)) {
      specialType = 'attributeToDocument';
    }
    if (specialType === 'component') {
      this.handleComponent(element);
    } else if (children) {
      this.handleDeclarationReflectionChildren(children, specialType);
    } else if (type) {
      this.handleType(type, specialType);
    } else if (signatures) {
      this.handleDeclarationReflectionSignatures(signatures, specialType);
    }
  }

  protected handleDeclarationReflectionChildren(children: DeclarationReflection[], specialType?: SpecialType) {
    const activeProp = this.context.getActiveProp();
    children.forEach((child) => {
      const newSpecialType = this.handleSpecialType(child as any, specialType, activeProp);
      this.handleDeclarationReflection(child, newSpecialType);
    });
  }

  protected handleDeclarationReflectionSignatures(signatures: SignatureReflection[], specialType?: SpecialType) {
    // currently, we only support signature[0]  => to be updated to handle all signature
    const signature = signatures[0];
    if (signature) {
      if (signature.kind === ReflectionKind.CallSignature) {
        this.handleCallSignature(signature, specialType);
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

  protected handleLiteral(type: LiteralType) {
    this.context.appendActiveType(`${type.value}`);
  }

  protected handleReferenceType(element: ReferenceType) {
    this.context.appendActiveType(this.buildLink('.', element));
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

  protected handleSpecialType(
    element: Reflection,
    specialType?: SpecialType,
    activeProp?: Props,
  ): SpecialType | undefined {
    if (specialType === 'element') {
      // this is a property of a component, let's add a prop in the context
      this.context.props.push({
        name: element.name,
        flags: element.flags,
        type: '',
        description: commentToDescription(element.comment as any),
        example: commentToExample(element.comment as any),
      });
      return undefined;
    } else if (specialType === 'attributeToDocument') {
      // this is a property of a component, let's add a prop in the context
      const prop: Props = {
        name: element.name,
        flags: element.flags,
        type: '',
        description: commentToDescription(element.comment as any),
        example: commentToExample(element.comment as any),
      };
      if (activeProp) {
        const children = activeProp.children;
        if (children) {
          children.push(prop);
        } else {
          activeProp.children = [prop];
        }
      }
      return undefined;
    }
    return specialType;
  }

  protected handleType(type: SomeType, specialType?: SpecialType) {
    if (type.type === 'reference') {
      let element: DeclarationReflection | null = null;
      if (specialType === 'element' || specialType === 'attributeToDocument') {
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
    } else if (type.type === 'literal') {
      this.handleLiteral(type);
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

import { ParameterReflection, ReflectionKind } from 'typedoc';
import {
  DeclarationReflection,
  IntersectionType,
  IntrinsicType,
  LiteralType,
  ReferenceType,
  ReflectionType,
  SignatureReflection,
  SomeType,
  TypeParameterReflection,
  UnionType,
} from 'typedoc/dist/lib/serialization/schema';
import { getDocusaurusPath } from '../util/file';
import { commentToDescription, commentToExample, isToDocument } from '../util/parser';
import ParsedElement, { Props } from './context';
import { Indexer } from './indexer';

type SpecialType = 'component' | 'element' | 'attributeToDocument';

export interface Context {
  specialType?: SpecialType;
  currentProp?: Props;
}

export class ElementParser {
  private element: ParsedElement;

  constructor(public indexer: Indexer) {
    this.element = new ParsedElement('', ReflectionKind.All);
  }

  parse(id: number): ParsedElement | undefined {
    const indexedElement = this.indexer.elements[id];
    if (!indexedElement) return;
    const subject = indexedElement.element;
    // Check if we have not already processed this item
    const indexedParsedElement = this.indexer.parsedElements[subject.id];
    if (indexedParsedElement) return indexedParsedElement;

    // Let's proccess this item
    this.element.name = subject.name;
    this.element.type = subject.kindString || subject.kind;
    this.element.groups = indexedElement.groups;
    this.element.categories = indexedElement.categories;
    this.element.description = commentToDescription(subject.comment);
    this.element.example = commentToExample(subject.comment);
    const context: Context = {};

    if (this.indexer.isComponent(subject.id)) {
      context.specialType = 'component';
    } else {
      context.specialType = 'element';
    }

    this.handleDeclarationReflection(subject, context);

    if (this.element.name === 'TestInterface') {
      console.log(JSON.stringify(this.element, null, 2));
    }

    // if (this.indexer.isComponent(subject.id)) {
    //   this.handleComponent(subject);
    // } else {
    //   this.handleDeclarationReflection(subject);
    // }
    return this.element;
  }

  protected getIndexedParsedElement(id: number) {
    // retrieve the processed element in index if it already exists
    // otherwise call parse() to process it
    const parsedElement: ParsedElement | undefined = this.indexer.parsedElements[id];
    if (parsedElement) return parsedElement;
    return new ElementParser(this.indexer).parse(id);
  }

  protected buildLink(element: ReferenceType) {
    const id = element.id;
    if (!id || !this.indexer.elements[id]) return element.name;
    const parsedElement = this.getIndexedParsedElement(id);
    if (!parsedElement) return element.name;
    return `[${element.name}](${getDocusaurusPath(parsedElement)})`;
  }

  protected handleCallSignature(element: SignatureReflection, context: Context) {
    const parameters = element.parameters;
    if (parameters) {
      parameters.forEach((parameter) => {
        const prop = this.asProp(parameter);
        this.element.props.push(prop);
        const type = parameter.type;
        if (type) {
          context.specialType = undefined;
          context.currentProp = prop;
          this.handleType(type, context);
        }
      });
    }

    // handle result
    const type = element.type;
    if (type) {
      if (type.type === 'reference' && type.hasOwnProperty('id') && type.id) {
        this.element.returns = this.getIndexedParsedElement(type.id);
      }
      // TODO support other types (string, number, boolean or array)
    }
  }

  protected handleComponent(container: DeclarationReflection, context: Context) {
    const signatures = container.signatures;
    if (signatures && signatures.length > 0) {
      this.element.description = commentToDescription(signatures[0].comment);
      const parameters = signatures[0].parameters;
      if (parameters) {
        parameters.forEach((p) => {
          if (p.kind === ReflectionKind.Parameter && p.name === 'props') {
            const type = p.type;
            if (type) this.handleType(type, context);
          }
        });
      }
    }
  }

  protected handleDeclarationReflection(element: DeclarationReflection, context: Context) {
    const type = element.type;
    const children = element.children;
    const signatures = element.signatures;
    const typeParameters = element.typeParameters;
    if (context.specialType === 'component') {
      this.handleComponent(element, context);
    } else if (children) {
      this.handleDeclarationReflectionChildren(children, context);
    } else if (typeParameters) {
      this.handleTypeParameters(typeParameters, context);
      if (type) {
        this.handleType(type, context);
      }
    } else if (type) {
      this.handleType(type, context);
    } else if (signatures) {
      this.handleDeclarationReflectionSignatures(signatures, context);
    }
  }
  handleTypeParameters(typeParameters: TypeParameterReflection[], context: Context) {
    if (context.specialType === 'component' || context.specialType === 'element') {
      typeParameters.forEach((typeParameter) => {
        this.element.typeParameters.push({
          name: typeParameter.name,
          description: commentToDescription(typeParameter.comment),
        });
      });
    }
  }

  protected handleDeclarationReflectionChildren(children: DeclarationReflection[], context: Context) {
    children.forEach((child) => {
      // const newSpecialType = this.handleSpecialType(child as any, specialType, activeProp);
      const prop = this.asProp(child);
      this.element.props.push(prop);
      if (child.type) {
        context.specialType = undefined;
        context.currentProp = prop;
        this.handleType(child.type, context);
      }
    });
  }

  protected handleDeclarationReflectionSignatures(signatures: SignatureReflection[], context: Context) {
    // currently, we only support signature[0]  => to be updated to handle all signature
    const signature = signatures[0];
    if (signature) {
      if (signature.kind === ReflectionKind.CallSignature) {
        this.handleCallSignature(signature, context);
      }
    }
  }

  protected handleIntersection(element: IntersectionType, context: Context) {
    const types = element.types;
    types.forEach((type) => {
      this.handleType(type, context);
    });
  }

  protected handleIntrinsic(element: IntrinsicType, context: Context) {
    this.appendTypeToProp(element.name, context);
  }

  protected handleLiteral(type: LiteralType, context: Context) {
    this.appendTypeToProp(`${type.value}`, context);
  }

  protected handleReferenceType(element: ReferenceType, context: Context) {
    this.appendTypeToProp(this.buildLink(element), context);
    const typeArguments = element.typeArguments;
    if (typeArguments) {
      // this is a type with generic like React.FC<...>
      this.appendTypeToProp('<', context);
      typeArguments.forEach((typeArgument) => {
        this.handleType(typeArgument, context);
      });
      this.appendTypeToProp('>', context);
    }
  }

  protected handleReflection(element: ReflectionType, context: Context) {
    const declaration = element.declaration;
    if (declaration) {
      this.handleDeclarationReflection(declaration, context);
    }
  }

  // protected handleSpecialType(element: Reflection, context: Context, activeProp?: Props) {
  //   if (!context) return;
  //   if (context.specialType === 'element') {
  //     // this is a property of a component, let's add a prop in the context
  //     this.element.props.push({
  //       name: element.name,
  //       flags: element.flags,
  //       type: '',
  //       description: commentToDescription(element.comment as any),
  //       example: commentToExample(element.comment as any),
  //     });
  //     context.specialType = undefined;
  //   } else if (context.specialType === 'attributeToDocument') {
  //     // this is a property of a component, let's add a prop in the context
  //     const prop: Props = {
  //       name: element.name,
  //       flags: element.flags,
  //       type: '',
  //       description: commentToDescription(element.comment as any),
  //       example: commentToExample(element.comment as any),
  //     };
  //     if (activeProp) {
  //       const children = activeProp.children;
  //       if (children) {
  //         children.push(prop);
  //       } else {
  //         activeProp.children = [prop];
  //       }
  //     }
  //     context.specialType = undefined;
  //   }
  // }

  protected handleType(type: SomeType, context: Context) {
    if (type.type === 'reference') {
      const id = type.id;
      if (id) {
        const parsedElement = this.getIndexedParsedElement(id);
        if (!parsedElement) {
          const prop = context.currentProp;
          if (prop) {
            prop.type = type.name;
          }
          return;
        }
        if (context.specialType === 'element') {
          this.element.props = parsedElement.props;
          return;
        }
        if (context.currentProp) {
          context.currentProp.type = parsedElement;
        }
      }
    } else if (type.type === 'reflection') {
      this.handleReflection(type, context);
    } else if (type.type === 'intersection') {
      this.handleIntersection(type, context);
    } else if (type.type === 'union') {
      this.handleUnion(type, context);
    } else if (type.type === 'intrinsic') {
      this.handleIntrinsic(type, context);
    } else if (type.type === 'literal') {
      this.handleLiteral(type, context);
    }
  }

  protected handleUnion(element: UnionType, context: Context) {
    const types = element.types;
    types.forEach((type, index) => {
      if (index > 0) {
        this.appendTypeToProp(' | ', context);
      }
      this.handleType(type, context);
    });
  }

  protected appendTypeToProp(type: string, context: Context) {
    const prop = context.currentProp;
    if (prop) {
      prop.type = `${prop.type}${type}`;
    }
  }

  protected asProp(parameter: ParameterReflection | DeclarationReflection): Props {
    return {
      name: parameter.name,
      flags: parameter.flags,
      type: '',
      description: commentToDescription(parameter.comment as any),
      example: commentToExample(parameter.comment as any),
      defaultValue: parameter.defaultValue,
      toDocument: isToDocument(parameter.comment as any),
    };
  }
}

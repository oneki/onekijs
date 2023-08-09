import { ParameterReflection, ReflectionKind } from 'typedoc';
import {
  ArrayType,
  DeclarationReflection,
  IntersectionType,
  IntrinsicType,
  LiteralType,
  ReferenceType,
  ReflectionSymbolId,
  ReflectionType,
  SignatureReflection,
  SomeType,
  TypeParameterReflection,
  UnionType,
} from 'typedoc/dist/lib/serialization/schema';
import { getDocusaurusPath } from '../util/file';
import { blockTagToString, commentToDescription, emptyProp, handleComment, isToDocument } from '../util/parser';
import ParsedElement, { Props, TypeParameter } from './context';
import { Indexer } from './indexer';

type SpecialType = 'component' | 'element' | 'attributeToDocument';

export interface Context {
  element: ParsedElement;
  specialType?: SpecialType;
  currentProp?: Props;
  typeParameters?: TypeParameter[];
  signatures?: string[];
  doNotBuildLink?: boolean;
}

export class ElementParser {
  // private element: ParsedElement;

  constructor(public indexer: Indexer) {
    //context.element = new ParsedElement('', ReflectionKind.All);
  }

  parse(id: number): ParsedElement | undefined {
    const indexedElement = this.indexer.elements[id];
    if (!indexedElement) return;
    const subject = indexedElement.element;
    // Check if we have not already processed this item
    const indexedParsedElement = this.indexer.parsedElements[subject.id];
    if (indexedParsedElement) return indexedParsedElement;

    // Let's proccess this item
    const parsedElement = new ParsedElement(subject.name, subject.kind);
    parsedElement.groups = indexedElement.groups;
    parsedElement.categories = indexedElement.categories;
    this.indexer.parsedElements[subject.id] = parsedElement;

    if (this.isAlias(subject, parsedElement)) return this.indexer.parsedElements[subject.id];

    const context: Context = {
      element: parsedElement,
    };
    handleComment(parsedElement, subject.comment, false);

    if (this.indexer.isComponent(subject.id)) {
      context.specialType = 'component';
      context.element.type = 'Component';
    } else {
      context.specialType = 'element';
    }

    this.handleDeclarationReflection(subject, context);

    return parsedElement;
  }

  protected isAlias(subject: DeclarationReflection, parsedElement: ParsedElement) {
    // Check if it's not an alias for another component
    const comment = subject.comment || (subject.signatures ? subject.signatures[0]?.comment : undefined);

    const see = blockTagToString('@see', comment, false);
    if (see !== undefined && see !== '') {
      const aliasElement = this.indexer.elementsByName[see];
      if (!aliasElement || !aliasElement.element) return false;
      const aliasParsedElement = this.getIndexedParsedElement(aliasElement.element.id);
      handleComment(parsedElement, comment, false);
      if (aliasParsedElement) {
        this.indexer.parsedElements[subject.id] = Object.assign({}, aliasParsedElement, {
          name: parsedElement.name,
          type: parsedElement.type,
          remarks: parsedElement.remarks,
          example: parsedElement.example,
        });
        return true;
      }
    }
    return false;
  }

  protected getIndexedParsedElement(id: number) {
    // retrieve the processed element in index if it already exists
    // otherwise call parse() to process it
    const parsedElement: ParsedElement | undefined = this.indexer.parsedElements[id];
    if (parsedElement) return parsedElement;
    return new ElementParser(this.indexer).parse(id);
  }

  protected buildLink(element: ReferenceType, context: Context) {
    if (context.doNotBuildLink === true) return element.name;
    const id = element.target;
    if (typeof(id) == 'number') {
      if (!id || !this.indexer.elements[id]) return element.name;
      const parsedElement = this.getIndexedParsedElement(id);
      if (!parsedElement) return element.name;
      return `[${element.name}](${getDocusaurusPath(parsedElement)})`;
    } else {
      return element.name;
    }
    
  }

  protected handleCallSignature(element: SignatureReflection, context: Context) {
    const parameters = element.parameters;
    if (parameters) {
      parameters.forEach((parameter) => {
        if (parameter.name.startsWith('[') && parameter.name.endsWith(']')) return;
        if (parameter.name.startsWith('_')) return;
        const prop = this.asProp(parameter as ParameterReflection);
        context.element.props.push(prop);
        const type = parameter.type;
        if (type) {
          this.handleType(type, {
            element: context.element,
            currentProp: prop,
          });
        }
      });
    }

    // handle type parameter
    const typeParameters = element.typeParameter;
    if (typeParameters) {
      this.handleTypeParameters(typeParameters, context);
    }

    // handle result
    const type = element.type;
    if (type) {
      const currentProp = emptyProp();
      this.handleType(type, {
        element: context.element,
        currentProp,
      });
      context.element.returns = currentProp.type;

      // if (type.type === 'reference' && type.hasOwnProperty('id') && type.id) {
      //   context.element.returns = this.getIndexedParsedElement(type.id);
      // }
      // TODO support other types (string, number, boolean or array)
    }
  }

  protected handleSignatureString(element: SignatureReflection, context: Context) {
    const parameters = element.parameters;
    let result = element.name;

    // handle type parameter
    const typeParameters = element.typeParameter;
    if (typeParameters) {
      const innerContext: Context = {
        element: context.element,
      };
      this.handleTypeParameters(typeParameters, innerContext);
      result += `<${innerContext.typeParameters?.map((typeParameter) => typeParameter.name).join(',')}>`;
    }
    result += '(';
    if (parameters) {
      result += parameters
        .map((parameter) => {
          const prop = this.asProp(parameter as ParameterReflection);
          const type = parameter.type;
          if (type) {
            this.handleType(type, {
              element: context.element,
              currentProp: prop,
              doNotBuildLink: true,
            });
          }
          return `${prop.name}: ${prop.type}`;
        })
        .join(',');
    }
    result += ')';

    // handle result
    const type = element.type;
    let name = '';
    if (type && type.hasOwnProperty('name')) {
      name = (type as any).name;
    }
    if (type && element.kind !== ReflectionKind.ConstructorSignature && name !== 'Generator') {
      const currentProp = emptyProp();
      this.handleType(type, {
        element: context.element,
        currentProp,
        doNotBuildLink: true,
      });
      result += `: ${currentProp.type}`;
    } else if (element.kind === ReflectionKind.ConstructorSignature) {
      result += '';
    } else {
      result += ': void';
    }
    context.signatures = context.signatures || [];
    context.signatures?.push(result);
  }

  protected handleComponent(container: DeclarationReflection, context: Context) {
    const signatures = container.signatures;
    if (signatures && signatures.length > 0) {
      handleComment(context.element, signatures[0].comment, false);
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
    context.typeParameters = [];
    typeParameters.forEach((typeParameter) => {
      context.typeParameters?.push({
        name: typeParameter.name,
        description: commentToDescription(typeParameter.comment),
      });
    });
    if (context.specialType === 'component' || context.specialType === 'element') {
      context.element.typeParameters = context.typeParameters;
    }
  }

  protected handleDeclarationReflectionChildren(children: DeclarationReflection[], context: Context) {
    children.forEach((child) => {
      // const newSpecialType = this.handleSpecialType(child as any, specialType, activeProp);
      if (child.name.startsWith('[') && child.name.endsWith(']')) return;
      if (child.name.startsWith('_')) return;
      const prop = this.asProp(child);
      context.element.props.push(prop);
      if (child.type) {
        context.specialType = undefined;
        context.currentProp = prop;
        this.handleType(child.type, context);
      }
      if (child.signatures) {
        const innerContext: Context = {
          element: new ParsedElement(child.name, child.kind),
          specialType: 'element',
        };
        this.handleDeclarationReflectionSignatures(child.signatures, innerContext);
        prop.description = innerContext.element.description;
        prop.type = innerContext.element.signatures[0];
      }
    });
  }

  protected handleDeclarationReflectionSignatures(signatures: SignatureReflection[], context: Context) {
    // currently, we only support signature[0]  => to be updated to handle all signature
    const signature = signatures[0];
    if (signature && context.specialType === 'element') {
      handleComment(context.element, signature.comment, false);
      if (signature.kind === ReflectionKind.CallSignature) {
        this.handleCallSignature(signature, context);
      }
    }
    const signatureContext: Context = {
      element: context.element,
    };
    signatures.forEach((signature) => {
      this.handleSignatureString(signature, signatureContext);
    });
    context.element.signatures = signatureContext.signatures || [];
  }

  protected handleIntersection(element: IntersectionType, context: Context) {
    const types = element.types;
    types.forEach((type) => {
      this.handleType(type, context);
    });
  }

  protected handleArray(element: ArrayType, context: Context) {
    this.handleType(element.elementType, context);
    this.appendTypeToProp('[]', context);
  }  

  protected handleIntrinsic(element: IntrinsicType, context: Context) {
    this.appendTypeToProp(element.name, context);
  }

  protected handleLiteral(type: LiteralType, context: Context) {
    this.appendTypeToProp(`${type.value}`, context);
  }

  protected handleReferenceType(element: ReferenceType, context: Context) {
    this.appendTypeToProp(this.buildLink(element, context), context);
    const typeArguments = element.typeArguments;
    if (typeArguments) {
      // this is a type with generic like React.FC<...>
      this.appendTypeToProp('<', context);
      typeArguments.forEach((typeArgument, i) => {
        if (i > 0) this.appendTypeToProp(', ', context);
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
  //     context.element.props.push({
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
      if (type.target && typeof(type.target) == 'number') {
        const parsedElement = this.getIndexedParsedElement(type.target);
        if (parsedElement) {
          if (context.specialType === 'element' || context.specialType === 'component') {
            context.element.props = parsedElement.props;
            return;
          }
          if (context.currentProp && context.currentProp.toDocument) {
            context.currentProp.type = parsedElement;
            return;
          }
        }
      }
      this.handleReferenceType(type, context);
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
    } else if (type.type === 'array') {
      this.handleArray(type, context);
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
    const prop: Props = {
      name: parameter.name,
      flags: parameter.flags,
      kind: parameter.kind,
      type: '',
      description: '',
      defaultValue: parameter.defaultValue,
      toDocument: isToDocument(parameter.comment as any),
    };

    handleComment(prop, parameter.comment as any);
    return prop;
  }
}

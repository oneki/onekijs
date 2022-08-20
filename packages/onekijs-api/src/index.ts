import apiJson from './api/test.json';
import {
  DeclarationReflection,
  SignatureReflection,
  ReferenceType,
  ReflectionType,
  IntersectionType,
  UnionType,
  SomeType,
  IntrinsicType,
  ReflectionFlags,
} from 'typedoc/dist/lib/serialization/schema';
import { ReflectionKind } from 'typedoc';

const components = ['MyComponent' /*, 'AccordionComponent'*/];
const idx: DeclarationReflection[] = [];
interface Props {
  name: string;
  flags: ReflectionFlags;
  type: string;
}
interface Context {
  props: Props[];
  propsLevel: boolean;
  propsChildrenLevel: boolean;
  typeArguments?: {
    start: string;
    end: string;
  };
}

const handleSignature = (signature: SignatureReflection) => {
  if (signature.kind === ReflectionKind.CallSignature) {
  }
};

const getCurrentProp = (context: Context) => {
  return context.props.at(-1);
};

const appendCurrentPropType = (context: Context, type: string) => {
  const currentProp = getCurrentProp(context);
  if (currentProp) {
    currentProp.type = `${currentProp.type}${type}`;
  }
};

const buildIndex = (container: DeclarationReflection) => {
  const children = container.children;
  if (children) {
    children.forEach((child) => {
      idx[child.id] = child;
    });
  }
};

const handleTypeArguments = (context: Context, element: SomeType) => {
  console.log('todo');
};

const handleReferenceType = (context: Context, element: ReferenceType) => {
  
  const id = element.id;
  if (id && idx[id]) {
    appendCurrentPropType(context, `[${element.name}](./${id}/${element.name})`);
  } else {
    appendCurrentPropType(context, element.name);
  }
  const typeArguments = element.typeArguments;
  if (typeArguments) {
    // this is a type with generic like React.FC<...>
    appendCurrentPropType(context, '<');
    typeArguments.forEach((typeArgument) => {
      handleType(context, typeArgument);
    });
    appendCurrentPropType(context, '>');
  }
};

const handleDeclarationReflection = (context: Context, element: DeclarationReflection) => {
  const children = element.children || [];
  const type = element.type;
  if (element.kind === ReflectionKind.TypeLiteral) {
    const isPropsLevel = context.propsLevel;
    context.propsLevel = false;
    children.forEach((c) => {
      if (isPropsLevel) {
        // this is a property of a component, let's add a prop in the context
        context.props.push({
          name: c.name,
          flags: c.flags,
          type: '',
        });
        context.propsChildrenLevel = true;
      }
      handleDeclarationReflection(context, c);
    });
  } else if (element.kind === ReflectionKind.TypeAlias || element.kind === ReflectionKind.Property) {
    if (type) {
      handleType(context, type);
    }
  }
};

const handleReflection = (context: Context, element: ReflectionType) => {
  const declaration = element.declaration;
  if (declaration) {
    handleDeclarationReflection(context, declaration);
  }
};

const handleIntersection = (context: Context, element: IntersectionType) => {
  const types = element.types;
  types.forEach((t) => {
    handleType(context, t);
  });
};

const handleUnion = (context: Context, element: UnionType) => {
  const types = element.types;
  types.forEach((t, i) => {
    if (i > 0) {
      appendCurrentPropType(context, ' | ');
    }
    handleType(context, t);
  });
};

const handleIntrinsic = (context: Context, element: IntrinsicType) => {
  appendCurrentPropType(context, element.name);
};

const handleType = (context: Context, type: SomeType) => {
  if (type.type === 'reference') {
    if (context.propsLevel) {
      // This is the definition of a component's props
      // we follow the link to handle it completely
      const id = type.id || 0;
      const element = idx[id];
      if (element) {
        handleDeclarationReflection(context, idx[id]);
      } else {
        handleReferenceType(context, type);
      }
    } else {
      handleReferenceType(context, type);
    }
  } else if (type.type === 'reflection') {
    handleReflection(context, type);
  } else if (type.type === 'intersection') {
    handleIntersection(context, type);
  } else if (type.type === 'union') {
    handleUnion(context, type);
  } else if (type.type === 'intrinsic') {
    handleIntrinsic(context, type);
  }
};

const handleComponent = (container: DeclarationReflection) => {
  const context: Context = {
    props: [],
    propsLevel: false,
    propsChildrenLevel: false,
  };
  const signatures = container.signatures;
  if (signatures && signatures.length > 0) {
    const parameters = signatures[0].parameters;
    if (parameters) {
      parameters.forEach((p) => {
        if (p.kind === ReflectionKind.Parameter && p.name === 'props') {
          context.propsLevel = true;
          const type = p.type;
          if (type) handleType(context, type);
        }
      });
    }
  }

  console.log(`${container.name}: ${JSON.stringify(context.props, null, 2)}`);
  // if (container.children) {
  //   container.children.forEach((child) => handleContainer(child));
  // }
};

const api = apiJson as DeclarationReflection;
buildIndex(api);
idx.forEach((e) => {
  if (components.includes(e.name) && e.kind === ReflectionKind.Function) {
    handleComponent(e);
  }
});

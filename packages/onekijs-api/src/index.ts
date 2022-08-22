import { DeclarationReflection } from 'typedoc/dist/lib/serialization/schema';
import apiJson from './api/test.json';
import { Indexer } from './lib/indexer';
import { MarkdownBuilder } from './lib/markdown';
import { ElementParser } from './lib/parser';

const api = apiJson as DeclarationReflection;

const indexer = new Indexer();
indexer.buildIndexes(api);

indexer.elements.forEach((e) => {
  const parser = new ElementParser(indexer);
  const parsedElement = parser.parse(e.element);
  console.log(JSON.stringify(parsedElement, null, 2));
  const builder = new MarkdownBuilder(parsedElement, '/home/onurb/workspace/oneki/onekijs/packages/onekijs-api/dist');
  builder.build();
});

// buildIndex(api);
// idx.forEach((e) => {
//   if (components.includes(e.name) && e.kind === ReflectionKind.Function) {
//     handleComponent(e);
//   }
// });

// const components = ['MyComponent' /*, 'AccordionComponent'*/];
// const idx: DeclarationReflection[] = [];
// interface Description {
//   description: string;
//   example?: string;
//   defaultValue?: string;
// }
// interface Props extends Description {
//   name: string;
//   flags: ReflectionFlags;
//   type: string;
// }
// interface Context extends Description {
//   props: Props[];
//   propsLevel: boolean;
// }

// const getCurrentProp = (context: Context) => {
//   return context.props.at(-1);
// };

// const appendCurrentPropType = (context: Context, type: string) => {
//   const currentProp = getCurrentProp(context);
//   if (currentProp) {
//     currentProp.type = `${currentProp.type}${type}`;
//   }
// };

// const commentToDescription = (comment?: Comment) => {
//   if (!comment) return '';
//   return comment.summary.reduce((description, summary) => {
//     return `${description}${summary.text}`;
//   }, '');
// };

// const commentToExample = (comment?: Comment) => {
//   if (!comment) return '';
//   const blockTags = comment.blockTags;
//   if (!blockTags) return '';
//   const exampleBlocks = blockTags.filter((blockTag) => blockTag.tag === '@example');
//   return exampleBlocks.reduce((description, blockTag) => {
//     const example = blockTag.content.reduce((example, content) => {
//       return `${example}${content.text}`;
//     }, '');
//     return `${description}${example}`;
//   }, '');
// };

// const buildIndex = (container: DeclarationReflection) => {
//   const children = container.children;
//   if (children) {
//     children.forEach((child) => {
//       idx[child.id] = child;
//     });
//   }
// };

// const handleReferenceType = (context: Context, element: ReferenceType) => {
//   const id = element.id;
//   if (id && idx[id]) {
//     appendCurrentPropType(context, `[${element.name}](./${id}/${element.name})`);
//   } else {
//     appendCurrentPropType(context, element.name);
//   }
//   const typeArguments = element.typeArguments;
//   if (typeArguments) {
//     // this is a type with generic like React.FC<...>
//     appendCurrentPropType(context, '<');
//     typeArguments.forEach((typeArgument) => {
//       handleType(context, typeArgument);
//     });
//     appendCurrentPropType(context, '>');
//   }
// };

// const handleDeclarationReflection = (context: Context, element: DeclarationReflection) => {
//   const children = element.children || [];
//   const type = element.type;
//   if (element.kind === ReflectionKind.TypeLiteral) {
//     const isPropsLevel = context.propsLevel;
//     context.propsLevel = false;
//     children.forEach((c) => {
//       if (isPropsLevel) {
//         // this is a property of a component, let's add a prop in the context
//         context.props.push({
//           name: c.name,
//           flags: c.flags,
//           type: '',
//           description: commentToDescription(c.comment),
//           example: commentToExample(c.comment),
//         });
//       }
//       handleDeclarationReflection(context, c);
//     });
//   } else if (element.kind === ReflectionKind.TypeAlias || element.kind === ReflectionKind.Property) {
//     if (type) {
//       handleType(context, type);
//     }
//   }
// };

// const handleReflection = (context: Context, element: ReflectionType) => {
//   const declaration = element.declaration;
//   if (declaration) {
//     handleDeclarationReflection(context, declaration);
//   }
// };

// const handleIntersection = (context: Context, element: IntersectionType) => {
//   const types = element.types;
//   types.forEach((t) => {
//     handleType(context, t);
//   });
// };

// const handleUnion = (context: Context, element: UnionType) => {
//   const types = element.types;
//   types.forEach((t, i) => {
//     if (i > 0) {
//       appendCurrentPropType(context, ' | ');
//     }
//     handleType(context, t);
//   });
// };

// const handleIntrinsic = (context: Context, element: IntrinsicType) => {
//   appendCurrentPropType(context, element.name);
// };

// const handleType = (context: Context, type: SomeType) => {
//   if (type.type === 'reference') {
//     if (context.propsLevel) {
//       // This is the definition of a component's props
//       // we follow the link to handle it completely
//       const id = type.id || 0;
//       const element = idx[id];
//       if (element) {
//         handleDeclarationReflection(context, idx[id]);
//       } else {
//         handleReferenceType(context, type);
//       }
//     } else {
//       handleReferenceType(context, type);
//     }
//   } else if (type.type === 'reflection') {
//     handleReflection(context, type);
//   } else if (type.type === 'intersection') {
//     handleIntersection(context, type);
//   } else if (type.type === 'union') {
//     handleUnion(context, type);
//   } else if (type.type === 'intrinsic') {
//     handleIntrinsic(context, type);
//   }
// };

// const handleComponent = (container: DeclarationReflection) => {
//   const context: Context = {
//     props: [],
//     propsLevel: false,
//     description: '',
//   };
//   const signatures = container.signatures;
//   if (signatures && signatures.length > 0) {
//     context.description = commentToDescription(signatures[0].comment);
//     const parameters = signatures[0].parameters;
//     if (parameters) {
//       parameters.forEach((p) => {
//         if (p.kind === ReflectionKind.Parameter && p.name === 'props') {
//           context.propsLevel = true;
//           const type = p.type;
//           if (type) handleType(context, type);
//         }
//       });
//     }
//   }

//   console.log(`${container.name}: ${JSON.stringify(context.props, null, 2)}`);
// };

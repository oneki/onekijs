import styled from 'styled-components';
import ButtonComponent from './component';
import buttonStyle from './style';

// const Button: FC<ButtonProps> = (props) => {
//   console.log('insideButton');
//   const ref = useLazyRef(() => {
//     return styled(ButtonComponent)`
//       background: red;
//     `;
//   });
//   const Component = ref.current;
//   return <Component {...props} />;
// };

// const Button = styled(ButtonComponent)`
//   background: red;
// `;

const Button = styled(ButtonComponent)`
  ${buttonStyle}
`;

export default Button;

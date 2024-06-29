import styled from 'styled-components';
import {
  Col,
  Row,
  StylableProps,
  backgroundColor,
  borderColor,
  borderLeftWidth,
  borderStyle,
  borderWidth,
  color,
  display,
  flexDirection,
  fontWeight,
  marginTop,
  minHeight,
  padding,
  paddingLeft,
  paddingX,
} from 'onekijs-ui';
import { FCC, FormProps, useForm } from 'onekijs';

type FormExampleProps = StylableProps & {
  form: FormProps['controller'];
};

const FormExample: FCC<FormExampleProps> = ({ className, form, children }) => {
  return (
    <Row gap="20px" marginTop="20px">
      <Col size={8}>{children}</Col>
      <Col size={4}>
        <div className={className}>
          <div>
            <span className="o-form-result-title">Result</span>
          </div>
          <div className="o-form-result-content">
            <pre>{JSON.stringify(form.getValue(), undefined, 2)}</pre>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default styled(FormExample)`
  ${paddingLeft('3xl')}
  ${display('flex')}
  ${flexDirection('column')}
  ${borderLeftWidth(1)}
  ${borderStyle('solid')}
  ${borderColor('dark')}
  ${minHeight('full')}
  .o-form-result-title {
    ${backgroundColor('primary')}
    ${padding('sm')}
    ${fontWeight('medium')}
    ${color('white')}
  }
  .o-form-result-content {
    ${backgroundColor('lightest')}
    ${paddingX('sm')}
  }
`;


import { Form, useFormController } from "onekijs";
import { addClassname, alignItems, backgroundColor, borderRadius, color, cursor, display, FormInput, InputProps, justifyContent, SearchIcon, width } from "onekijs-ui";
import styled, { css } from "styled-components";


const SearchComponent: React.FC<InputProps> = ({ className }) => {
  return (
    <div className={addClassname('o-search-icon-container', className)}>
      <SearchIcon width="14px" height="14px" />
    </div>
  );
};

const StyledSearchComponent = styled(SearchComponent)`
  ${css`
    ${width('20px')}
    ${display('flex')}
    ${alignItems('center')}
    ${borderRadius('none')}
    ${justifyContent('center')}
    ${cursor('pointer')}
    ${backgroundColor('inherit', {
      hover: 'primary',
    })}
    ${color('primary', {
      hover: 'white',
    })}
  `}
`;


export const InputPage = () => {
  const formController1 = useFormController();
  const formController2 = useFormController();
  return (
    <>
      <Form style={{ display: 'flex', justifyContent: 'center' }} controller={formController1} onSubmit={() => {}}>
        <div style={{ width: '300px' }}>
          <FormInput
            name="toto"
            label="Extra Small Input"
            help="test"
            size="xsmall"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto1"
            label="Small Input"
            help="test"
            size="small"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto2"
            label="Medium Input"
            help="test"
            size="medium"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto3"
            label="Large Input"
            help="test"
            size="large"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto4"
            label="Extra Large Input"
            help="test"
            size="xlarge"
            PrefixComponent={StyledSearchComponent}
          />
        </div>
      </Form>
      <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} controller={formController2} onSubmit={() => {}} layout="horizontal">
        <div style={{ width: '800px' }}>
          <FormInput
            name="toto"
            label="Extra Small Input"
            help="test"
            size="xsmall"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto1"
            label="Small Input"
            help="test"
            size="small"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto2"
            label="Medium Input"
            help="test"
            size="medium"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto3"
            label="Large Input"
            help="test"
            size="large"
            PrefixComponent={StyledSearchComponent}
          />
          <FormInput
            name="toto4"
            label="Extra Large Input"
            help="test"
            size="xlarge"
            PrefixComponent={StyledSearchComponent}
          />
        </div>
      </Form>
    </>
  );
};

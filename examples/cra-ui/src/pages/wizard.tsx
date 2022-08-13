import { Input, useForm } from 'onekijs';
import { ComponentStyle, Step, Wizard, WizardModal } from 'onekijs-ui';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const wizardStyle: ComponentStyle<{}> = () => {
  return css`
    input {
      border: 1px solid gray;
    }
    input.o-input-error {
      border: 1px solid red;
    }
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const { Form, values, validations, submit } = useForm((value) => console.log(value));
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>{open ? 'Close modal' : 'Open modal'}</button>
      <Form className={className}>
        <WizardModal
          open={open}
          title="New Virtual Machine"
          layout="vertical"
          forwardOnly={true}
          onDone={submit}
          closeOnEscape={true}
          onClose={() => setOpen(false)}
          size="large"
        >
          <Step title="Services" key="test">
          Lastname : <Input name="lastname" required={true} />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur. Quam nulla porttitor massa id neque
              aliquam vestibulum morbi. Consequat interdum varius sit amet mattis. Luctus venenatis lectus magna
              fringilla urna porttitor rhoncus dolor. Bibendum enim facilisis gravida neque convallis a cras. Dui nunc
              mattis enim ut tellus elementum sagittis. Quis commodo odio aenean sed adipiscing diam donec adipiscing.
              Facilisi cras fermentum odio eu feugiat pretium nibh. Magna sit amet purus gravida quis blandit.
            </p>
            <p>
              Orci porta non pulvinar neque laoreet suspendisse interdum. Morbi tristique senectus et netus et malesuada
              fames ac. Turpis egestas sed tempus urna et pharetra pharetra massa. Arcu odio ut sem nulla pharetra. At
              consectetur lorem donec massa sapien. Risus viverra adipiscing at in tellus integer feugiat scelerisque.
              Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Suscipit adipiscing bibendum est
              ultricies integer quis auctor. Massa vitae tortor condimentum lacinia quis vel. Neque egestas congue
              quisque egestas diam in arcu cursus euismod. Est velit egestas dui id ornare. Suspendisse in est ante in
              nibh. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Auctor elit sed vulputate mi sit
              amet mauris. Malesuada proin libero nunc consequat interdum varius.
            </p>
            <p>
              Aliquet sagittis id consectetur purus ut. Mus mauris vitae ultricies leo integer malesuada nunc. At quis
              risus sed vulputate odio. Elit pellentesque habitant morbi tristique senectus et netus. Felis eget nunc
              lobortis mattis. Sit amet facilisis magna etiam tempor. Ut porttitor leo a diam sollicitudin tempor id eu.
              Semper quis lectus nulla at volutpat diam ut venenatis. Nulla facilisi morbi tempus iaculis. Neque aliquam
              vestibulum morbi blandit. Dui id ornare arcu odio ut sem nulla pharetra diam. Etiam erat velit scelerisque
              in dictum non.
            </p>
          </Step>
          <Step title="Resources" key="test1">
            Firstname : <Input name="firstname" required={true} />
          </Step>
          <Step title="Context" disabled={true} key="test2">
            <div>Section3</div>
          </Step>
          <Step title="Volumes" key="test3">
            <div>Section3</div>
          </Step>
        </WizardModal>
      </Form>
      <div>
        <pre>{JSON.stringify(values)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(validations)}</pre>
      </div>
    </>
  );
};

export const WizardPage = styled(Page)`
  ${wizardStyle}
`;

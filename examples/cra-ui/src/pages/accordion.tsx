import { Accordion, AccordionPanel, ComponentStyle } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const accordionStyle: ComponentStyle<{}> = () => {
  return css``;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Accordion animate={200} border={true}>
      <AccordionPanel title="title1">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Consequat interdum varius sit amet mattis. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Bibendum enim facilisis gravida neque convallis a cras. Dui nunc mattis enim ut tellus elementum sagittis. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Facilisi cras fermentum odio eu feugiat pretium nibh. Magna sit amet purus gravida quis blandit.</p>
      <p>Orci porta non pulvinar neque laoreet suspendisse interdum. Morbi tristique senectus et netus et malesuada fames ac. Turpis egestas sed tempus urna et pharetra pharetra massa. Arcu odio ut sem nulla pharetra. At consectetur lorem donec massa sapien. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Suscipit adipiscing bibendum est ultricies integer quis auctor. Massa vitae tortor condimentum lacinia quis vel. Neque egestas congue quisque egestas diam in arcu cursus euismod. Est velit egestas dui id ornare. Suspendisse in est ante in nibh. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Auctor elit sed vulputate mi sit amet mauris. Malesuada proin libero nunc consequat interdum varius.</p>
      <p>Aliquet sagittis id consectetur purus ut. Mus mauris vitae ultricies leo integer malesuada nunc. At quis risus sed vulputate odio. Elit pellentesque habitant morbi tristique senectus et netus. Felis eget nunc lobortis mattis. Sit amet facilisis magna etiam tempor. Ut porttitor leo a diam sollicitudin tempor id eu. Semper quis lectus nulla at volutpat diam ut venenatis. Nulla facilisi morbi tempus iaculis. Neque aliquam vestibulum morbi blandit. Dui id ornare arcu odio ut sem nulla pharetra diam. Etiam erat velit scelerisque in dictum non.</p>
      <p>Ultricies lacus sed turpis tincidunt id aliquet. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Neque gravida in fermentum et. Sed velit dignissim sodales ut eu sem integer vitae. Nisi lacus sed viverra tellus in hac habitasse. Mattis aliquam faucibus purus in massa tempor nec. Interdum consectetur libero id faucibus. At imperdiet dui accumsan sit amet nulla facilisi. Metus vulputate eu scelerisque felis imperdiet. Vivamus arcu felis bibendum ut tristique et egestas. Cursus eget nunc scelerisque viverra mauris in aliquam.</p>
      <p>Ultrices eros in cursus turpis massa. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Lacus sed turpis tincidunt id aliquet. Neque vitae tempus quam pellentesque nec nam. Sit amet est placerat in egestas erat. A scelerisque purus semper eget. Volutpat est velit egestas dui id ornare arcu odio ut. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Iaculis eu non diam phasellus vestibulum lorem sed risus. Aliquam sem fringilla ut morbi tincidunt augue interdum. Suspendisse potenti nullam ac tortor. Viverra mauris in aliquam sem fringilla.</p>
      </AccordionPanel>
      <AccordionPanel title="title2">
        <div>Section2</div>
      </AccordionPanel>
      <AccordionPanel title="title3">
        <div>Section3</div>
      </AccordionPanel>
      <AccordionPanel title="title4">
        <div>Section4</div>
      </AccordionPanel>
    </Accordion>
  );
};

export const AccordionPage = styled(Page)`
  ${accordionStyle}
`;

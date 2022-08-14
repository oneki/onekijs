import { BasicError, DefaultBasicError, Input, useForm } from 'onekijs';
import { ComponentStyle, DropdownButton, MenuIcon, Modal, Step, Wizard } from 'onekijs-ui';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ActionMenu, ActionMenuItem, ActionMenuList } from './typing';

const actionMenuStyle: ComponentStyle<{}> = () => {
  return css``;
};

type ActionProps = {
  title: string;
  onSuccess: (title: string, requestNumber: number) => void;
  onError: (title: string, error: BasicError) => void;
  onCancel: (title: string) => void;
};

const ActionMenuListComponent: ActionMenuList<ActionProps> = ({ items, onSelect }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={`item-${index}`} onClick={() => onSelect(item.title)}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

const ActionMenuComponent: ActionMenu<ActionProps> = ({ items }) => {
  const [active, setActive] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const ActiveItem = active ? items.find((i) => i.title === active) : undefined;
  const lastActiveItem = useRef<ActionMenuItem<ActionProps> | undefined>();
  if (ActiveItem !== undefined) {
    lastActiveItem.current = ActiveItem;
  }
  const LastActiveItem = lastActiveItem.current;
  return (
    <>
      <DropdownButton
        open={open}
        onDrop={() => setOpen(true)}
        onCollapse={() => setOpen(false)}
        IconComponent={() => <MenuIcon width="16px" />}
        listElement={
          <ActionMenuListComponent
            items={items}
            onSelect={(title) => {
              setActive(title);
              setOpen(false);
            }}
          />
        }
      >
        Actions
      </DropdownButton>
      <Modal
        onClose={() => setActive(undefined)}
        size={lastActiveItem.current?.size}
        width={lastActiveItem.current?.width}
        height={lastActiveItem.current?.height}
        open={ActiveItem !== undefined}
      >
        {LastActiveItem && (
          <LastActiveItem
            title={LastActiveItem.title}
            onSuccess={() => setActive(undefined)}
            onError={() => setActive(undefined)}
            onCancel={() => setActive(undefined)}
          />
        )}
      </Modal>
    </>
  );
};

const Item1: ActionMenuItem<ActionProps> = ({ title, onSuccess, onError }) => {
  const { Form, submit } = useForm(() => onSuccess(title, 0), {
    onError: () => onError(title, new DefaultBasicError('error')),
  });
  return (
    <Form>
      <Wizard title={title} onDone={submit}>
        <Step title="Item1-step1">
          <Input name="firstname" />
        </Step>
      </Wizard>
    </Form>
  );
};

Item1.title = 'Item1';
Item1.size = 'medium';

const Item2: ActionMenuItem<ActionProps> = ({ title, onSuccess, onError }) => {
  const { Form, submit } = useForm(
    async function () {
      await new Promise((r) => setTimeout(r, 5000));
      onSuccess(title, 0);
    },
    {
      onError: () => onError(title, new DefaultBasicError('error')),
    },
  );
  return (
    <Form>
      <Wizard title={title} onDone={submit}>
        <Step title="Step1">
          <Input name="firstname" required={true} />
        </Step>
        <Step title="Step2">
          <Input name="lastname" required={true} />
        </Step>
      </Wizard>
    </Form>
  );
};

Item2.title = 'Item2';
Item2.size = 'large';

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return <ActionMenuComponent items={[Item1, Item2]} />;
};

export const ActionMenuPage = styled(Page)`
  ${actionMenuStyle}
`;

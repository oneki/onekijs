import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SelectItem, SelectTokensProps } from '../typings';
import SelectTokenComponent from './SelectTokenComponent';

const SelectTokensComponent = <T, I extends SelectItem<T> = SelectItem<T>>({
  tokens,
  onRemove,
}: SelectTokensProps<T, I>) => {
  const widthRef = useRef<number>();

  const onExiting = (node: HTMLElement) => {
    node.style.width = '0';
    node.style.opacity = '0';
  };

  const onEntering = (node: HTMLElement) => {
    widthRef.current = node.getBoundingClientRect().width;
    node.style.width = '0px';
    node.style.opacity = '0';
    node.style.transition = 'all 150ms';
    setTimeout(() => {
      node.style.width = `${widthRef.current}px`;
      node.style.opacity = '1';
    }, 0);
  };

  if (tokens !== undefined) {
    return (
      <TransitionGroup component={null}>
        {tokens.map((token, index) => (
          <CSSTransition
            timeout={150}
            classNames="o-select-token-animation"
            mountOnEnter={true}
            appear={true}
            unmountOnExit={true}
            key={`o-select-token-${token.id}`}
            onEntering={onEntering}
            onExiting={onExiting}
          >
            <SelectTokenComponent token={token} onRemove={onRemove} index={index} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
  return null;
};

SelectTokensComponent.displayName = 'SelectTokensComponent';

export default React.memo(SelectTokensComponent) as typeof SelectTokensComponent;

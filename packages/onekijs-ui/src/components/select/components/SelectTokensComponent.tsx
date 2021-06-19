import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SelectTokensProps } from '../typings';
import SelectTokenComponent from './SelectTokenComponent';

const SelectTokensComponent: FC<SelectTokensProps> = React.memo(({ tokens, onRemove }) => {
  if (tokens !== undefined && tokens.length > 0) {
    return (
      <TransitionGroup component={null}>{tokens.map((token, index) =>
        <CSSTransition
          timeout={300}
          classNames="o-select-token-animation"
          mountOnEnter={true}
          appear={true}
          unmountOnExit={true}
          key={`o-select-token-${token.id}`}
        >
          <SelectTokenComponent token={token} onRemove={onRemove} index={index} />
        </CSSTransition>
      )}
      </TransitionGroup>
    );
  }
  return null;
});

export default SelectTokensComponent;

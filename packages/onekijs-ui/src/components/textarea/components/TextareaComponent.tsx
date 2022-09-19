import React, { FC, useState } from 'react';
import { addClassname } from '../../../utils/style';
import { TextareaProps } from '../typings';

const TextareaComponent: FC<TextareaProps> = (props) => {
  const {
    className,
    size = 'medium',
    status,
    onFocus: forwardFocus,
    onBlur: forwardBlur,
    ...textareaProps
  } = props;

  const [focus, setFocus] = useState(false);

  const classNames = addClassname(
    `o-textarea o-textarea-size-${size}${focus ? ' o-textarea-focus' : ''}${
      status ? ' o-textarea-status-' + status.toLowerCase() : ''
    }`,
    className,
  );

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setFocus(true);
    forwardFocus && forwardFocus(e);
  };

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setFocus(false);
    forwardBlur && forwardBlur(e);
  };

  return (
    <div className={classNames}>
      <textarea className="o-textarea-field" {...textareaProps} onFocus={onFocus} onBlur={onBlur} />
    </div>
  );
};

TextareaComponent.displayName = 'TextareaComponent';
export default TextareaComponent;

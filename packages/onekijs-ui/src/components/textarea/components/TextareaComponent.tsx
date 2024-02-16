import React, { FC, useEffect, useRef, useState } from 'react';
import { addClassname } from '../../../utils/style';
import { TextareaProps } from '../typings';

const TextareaComponent: FC<TextareaProps> = (props) => {
  const {
    className,
    size = 'medium',
    status,
    onFocus: forwardFocus,
    onBlur: forwardBlur,
    onChange: forwardChange,
    value,
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

  const ref = useRef<HTMLTextAreaElement>(null);
  const selectorRef = useRef<number | null | undefined>()
  const onChange: React.InputHTMLAttributes<HTMLTextAreaElement>['onChange'] = (e) => {
    selectorRef.current = e.target.selectionStart;
    forwardChange && forwardChange(e);
  }

  useEffect(() => {
    if (selectorRef.current !== undefined && selectorRef.current !== null && ref.current) {
      ref.current.setSelectionRange(selectorRef.current, selectorRef.current);
      selectorRef.current = undefined;
    }
  }, [value]);

  return (
    <div className={classNames}>
      <textarea className="o-textarea-field" {...textareaProps} ref={ref} onFocus={onFocus} onBlur={onBlur} onChange={value === undefined ? undefined : onChange} value={value} />
    </div>
  );
};

TextareaComponent.displayName = 'TextareaComponent';
export default TextareaComponent;

import React, { FC, useEffect, useRef, useState } from 'react';
import { addClassname } from '../../../utils/style';
import { InputProps } from '../typings';

const InputComponent: FC<InputProps> = (props) => {
  const {
    className,
    size = 'medium',
    status,
    PrefixComponent,
    SuffixComponent,
    onFocus: forwardFocus,
    onBlur: forwardBlur,
    onChange: forwardChange,
    value,
    ...inputProps
  } = props;

  const [focus, setFocus] = useState(false);

  const classNames = addClassname(
    `o-input o-input-size-${size}${focus ? ' o-input-focus' : ''}${
      status ? ' o-input-status-' + status.toLowerCase() : ''
    }`,
    className,
  );

  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocus(true);
    forwardFocus && forwardFocus(e);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocus(false);
    forwardBlur && forwardBlur(e);
  };

  const ref = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<number | null | undefined>()
  const onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
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
      {PrefixComponent && <PrefixComponent {...props} className="o-input-prefix" />}
      <input className="o-input-field" {...inputProps} ref={ref} onFocus={onFocus} onBlur={onBlur} onChange={value === undefined ? undefined : onChange} value={value} />
      {SuffixComponent && <SuffixComponent {...props} className="o-input-suffix" />}
    </div>
  );
};

InputComponent.displayName = 'InputComponent';
export default InputComponent;

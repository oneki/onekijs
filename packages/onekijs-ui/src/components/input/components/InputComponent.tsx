import React, { FC, useState } from 'react';
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

  return (
    <div className={classNames}>
      {PrefixComponent && <PrefixComponent {...props} className="o-input-prefix" />}
      <input className="o-input-field" {...inputProps} onFocus={onFocus} onBlur={onBlur} />
      {SuffixComponent && <SuffixComponent {...props} className="o-input-suffix" />}
    </div>
  );
};

InputComponent.displayName = 'InputComponent';
export default InputComponent;

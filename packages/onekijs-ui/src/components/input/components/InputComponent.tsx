import React, { FC } from 'react';
import { InputProps } from '../typings';
import { addClassname } from '../../../utils/style';

const InputComponent: FC<InputProps> = (props) => {
  const { className, size = 'medium', status, PrefixComponent, SuffixComponent, ...inputProps } = props;
  const classNames = addClassname(
    `o-input o-input-size-${size}${status ? ' o-input-status-' + status.toLowerCase() : ''}`,
    className,
  );

  return (
    <div className={classNames}>
      {PrefixComponent && <PrefixComponent {...props} className="o-input-prefix" />}
      <input className="o-input-field" {...inputProps} />
      {SuffixComponent && <SuffixComponent {...props} className="o-input-suffix" />}
    </div>
  );
};

InputComponent.displayName = 'InputComponent';
export default InputComponent;

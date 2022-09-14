import React, { ChangeEvent, FC, useId } from 'react';
import { addClassname } from '../../../utils/style';
import { CheckboxProps } from '../typings';

const CheckboxComponent: FC<CheckboxProps> = ({
  label,
  className = '',
  onChange,
  value = false,
  bordered = true,
  status,
  ...checkboxProps
}) => {
  const id = useId();

  const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked);
  };

  return (
    <div className={addClassname(`o-checkbox ${checkboxProps.disabled ? 'o-checkbox-disabled' : 'o-checkbox-enabled'}${status ? ' o-checkbox-status-' + status.toLowerCase() : ''}`, className)}>
      <label htmlFor={id} onClick={(e) => e.stopPropagation()}>
        <div className="o-checkbox-container">
          <svg className="o-checkbox-svg" viewBox="-281 373 48 48">
            <path className="o-checkbox-svg-stroke" d="M-273.2,398.2l10,9.9 l22.4-22.3" />
          </svg>
          <input
            {...checkboxProps}
            onChange={onChecked}
            checked={value}
            id={id}
            type="checkbox"
            className="o-checkbox-input"
          />
        </div>
        {label && <span className="o-checkbox-label">{label}</span>}
      </label>
    </div>
  );
};

export default CheckboxComponent;

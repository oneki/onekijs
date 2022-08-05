import { generateUniqueId } from 'onekijs-framework';
import React, { ChangeEvent, FC, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { CheckboxProps } from '../typings';

const CheckboxComponent: FC<CheckboxProps> = ({
  label,
  className = '',
  onChange,
  value = false,
  bordered = true,
  ...checkboxProps
}) => {
  const id = useRef(generateUniqueId());

  const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked);
  };

  return (
    <div className={addClassname('o-checkbox', className)}>
      <label htmlFor={id.current} onClick={(e) => e.stopPropagation()}>
        <div className="o-checkbox-container">
          <svg className="o-checkbox-svg" viewBox="-281 373 48 48">
            <path className="o-checkbox-svg-stroke" d="M-273.2,398.2l10,9.9 l22.4-22.3" />
          </svg>
          <input
            {...checkboxProps}
            onChange={onChecked}
            checked={value}
            id={id.current}
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

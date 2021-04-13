import { useIsomorphicLayoutEffect } from 'onekijs-core';
import React, { FC, useCallback, useRef, useMemo } from 'react';
import { SelectInputProps } from '../typings';
import SelectIconComponent from './SelectIconComponent';

const SelectInputComponent: FC<SelectInputProps> = ({
  onIconClick,
  open,
  placeholder,
  loading,
  IconComponent = SelectIconComponent,
  onFocus,
  onBlur,
  onChange,
  value,
  focus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const partialValueRef = useRef('');
  const proxifyRef = useRef(true);
  const proxyValue =
    value === undefined || !proxifyRef.current ? (focus ? partialValueRef.current : '') : String(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (input) {
        const currentSelectionStart = input.selectionStart;
        const currentSelectionEnd = input.selectionEnd;
        if (currentSelectionStart && currentSelectionStart !== currentSelectionEnd) {
          partialValueRef.current = input.value.substring(0, currentSelectionStart);
        } else {
          partialValueRef.current = input.value;
        }
      }
      if (onChange) {
        e.target.value = partialValueRef.current;
        onChange(e);
      }
    },
    [onChange],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (!input) return;
    if (e.keyCode === 8 || e.keyCode === 46) {
      proxifyRef.current = false;
    } else {
      const currentSelectionStart = input.selectionStart;
      const currentSelectionEnd = input.selectionEnd;
      if (currentSelectionStart === currentSelectionEnd && currentSelectionStart === input.value.length) {
        proxifyRef.current = true;
      }
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const input = inputRef.current;
    if (input && focus) {
      if (value !== undefined && String(value).startsWith(partialValueRef.current) && proxifyRef.current) {
        input.setSelectionRange(partialValueRef.current.length, String(value).length);
      }
    }
  });

  const className = useMemo(() => {
    const result = ['o-select-input-container'];
    if (focus) {
      result.push('o-select-input-focus');
    }
    return result.join(' ');
  }, [focus]);

  return (
    <div className={className}>
      <div className="o-select-input-marker" />
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="o-select-input"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={proxyValue}
      />
      <IconComponent onIconClick={onIconClick} open={open} loading={loading} />
    </div>
  );
};

export default SelectInputComponent;

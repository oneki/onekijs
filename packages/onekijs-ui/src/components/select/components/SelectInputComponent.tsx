import { useIsomorphicLayoutEffect } from 'onekijs-framework';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { SelectInputProps } from '../typings';
import SelectIconComponent from './SelectIconComponent';
import SelectTokensComponent from './SelectTokensComponent';

const SelectInputComponent: FC<SelectInputProps> = ({
  setOpen,
  open,
  placeholder,
  loading,
  fetching,
  IconComponent = SelectIconComponent,
  onFocus: forwardFocus,
  onBlur: forwardBlur,
  onChange,
  onRemove,
  value,
  focus,
  multiple,
  tokens,
  autoFocus,
  style,
  nullable,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autoSizeRef = useRef<HTMLSpanElement>(null);
  // partialValue is the part of the selected item entered by the user
  const partialValueRef = useRef<string | undefined>(undefined);
  // replace the input value by the selected item
  const showSelectedRef = useRef(true);

  const partialValue = partialValueRef.current ?? value ?? '';

  // value that is actually shown in the input.
  // This value is set to the partial value (that is the unselected part of the value) if the value is pending loading or we don't
  const showPartialValue =
    value === undefined ||
    fetching ||
    loading ||
    !showSelectedRef.current ||
    !value.toString().toLowerCase().startsWith(partialValue.toLowerCase());
  const proxyValue = showPartialValue
    ? focus || loading || fetching
      ? value !== undefined &&
        showSelectedRef.current &&
        value.toString().toLowerCase().startsWith(partialValue.toLowerCase())
        ? value
        : partialValue
      : ''
    : value;

  const handleChange = useCallback(() => {
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
    onChange(partialValueRef.current || '');
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!input) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        showSelectedRef.current = false;
        if (e.key === 'Backspace' && proxyValue === '' && multiple && tokens && tokens.length > 0) {
          onRemove(tokens[tokens.length - 1], tokens.length - 1);
        }
      } else if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        if (multiple) {
          partialValueRef.current = undefined;
          showSelectedRef.current = true;
        } else {
          inputRef.current && inputRef.current.blur();
        }
      } else if (['Escape'].includes(e.key)) {
        partialValueRef.current = undefined;
        showSelectedRef.current = true;
      } else {
        const currentSelectionStart = input.selectionStart;
        const currentSelectionEnd = input.selectionEnd;
        if (currentSelectionStart === currentSelectionEnd && currentSelectionStart === input.value.length) {
          showSelectedRef.current = true;
        }
      }
    },
    [multiple, proxyValue, tokens, onRemove],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!input) return;
      if (proxyValue === partialValueRef.current + e.key) {
        partialValueRef.current = proxyValue;
        onChange(proxyValue);
      }
    },
    [proxyValue, onChange],
  );

  useIsomorphicLayoutEffect(() => {
    const input = inputRef.current;
    const autoSizer = autoSizeRef.current;
    if (input && focus) {
      if (
        value !== undefined &&
        value !== partialValueRef.current &&
        value.toLowerCase().startsWith((partialValueRef.current || '').toLowerCase()) &&
        showSelectedRef.current
      ) {
        input.setSelectionRange((partialValueRef.current || '').length, value.length);
      }
    }
    if (input && autoSizer) {
      autoSizer.innerText = input.value;
    }
  });

  const className = useMemo(() => {
    const result = ['o-select-input-container'];
    if (focus) {
      result.push('o-select-input-focus');
    }
    return result.join(' ');
  }, [focus]);

  const onClick = useCallback(() => {
    if (!open) {
      setOpen(true);
    }
  }, [open, setOpen]);

  const onFocus = useCallback(
    (e) => {
      inputRef.current && inputRef.current.select();
      forwardFocus && forwardFocus(e);
    },
    [forwardFocus],
  );

  const onBlur = useCallback(
    (e) => {
      partialValueRef.current = undefined;
      showSelectedRef.current = true;
      forwardBlur && forwardBlur(e);
    },
    [forwardBlur],
  );

  const onIconClick = useCallback(
    (e) => {
      if (!open) {
        inputRef.current && inputRef.current.select();
      }
      forwardFocus && forwardFocus(e);
      setOpen(!open);
    },
    [open, forwardFocus, setOpen],
  );

  const onNullify = useCallback(() => {
    onChange(null);
  }, [onChange]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={className} style={style}>
      <div className="o-select-input-data">
        {multiple && <SelectTokensComponent tokens={tokens} onRemove={onRemove} />}
        <div className="o-select-input-wrapper">
          <span ref={autoSizeRef} className="o-select-input-auto-sizer" />
          <input
            ref={inputRef}
            placeholder={placeholder}
            className="o-select-input"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            value={proxyValue}
            onClick={onClick}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </div>
      {!multiple && nullable && value && (
        <div className="o-select-remover" onClick={onNullify}>
          &#10006;
        </div>
      )}
      <IconComponent onClick={onIconClick} open={open} loading={loading} fetching={fetching} />
    </div>
  );
};

export default SelectInputComponent;

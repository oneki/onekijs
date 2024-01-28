import { useIsomorphicLayoutEffect } from 'onekijs-framework';
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { SelectInputProps, SelectItem } from '../typings';
import SelectIconComponent from './SelectIconComponent';
import SelectTokensComponent from './SelectTokensComponent';

const SelectInputComponent = <T, I extends SelectItem<T> = SelectItem<T>>(
  {
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
    clickable,
    searchable,
    minChars,
    disabled,
    maxDisplayTokens,
  }: SelectInputProps<T, I>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autoSizeRef = useRef<HTMLSpanElement | null>(null);
  // partialValue is the part of the selected item entered by the user
  const partialValueRef = useRef<string | undefined>(undefined);
  // replace the input value by the selected item
  const showSelectedRef = useRef(true);

  const partialValue = partialValueRef.current ?? value ?? '';

  const [_, refresh] = useReducer((x) => x + 1, 0);

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
      if (currentSelectionStart && currentSelectionStart !== currentSelectionEnd && currentSelectionStart >= minChars) {
        partialValueRef.current = input.value.substring(0, currentSelectionStart);
      } else {
        partialValueRef.current = input.value;
      }
    }
    if ((partialValueRef.current?.length || 0) >= minChars) {
      onChange(partialValueRef.current || '');
    } else {
      setOpen(false);
      refresh();
    }
  }, [onChange, minChars, setOpen]);

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
    if (!open && clickable && !disabled) {
      setOpen(true);
      inputRef.current && inputRef.current.focus();
    }
    if (open && !searchable) {
      setOpen(false);
    }
  }, [open, setOpen, clickable, searchable, disabled]);

  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (searchable) {
        inputRef.current && inputRef.current.select();
      }
      forwardFocus && forwardFocus(e);
    },
    [forwardFocus, searchable],
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      partialValueRef.current = undefined;
      showSelectedRef.current = true;
      forwardBlur && forwardBlur(e);
    },
    [forwardBlur],
  );

  const onIconClick = useCallback(
    (e: any) => {
      if (!disabled) {
        if (!open && searchable) {
          inputRef.current && inputRef.current.select();
        }
        forwardFocus && forwardFocus(e);
        setOpen(!open);
      }
    },
    [open, forwardFocus, setOpen, disabled, searchable],
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
    <div className={className} style={style} ref={ref}>
      <div className="o-select-input-data" onClick={searchable ? undefined : onClick}>
        {multiple && <SelectTokensComponent tokens={tokens} onRemove={onRemove} maxDisplayTokens={maxDisplayTokens} />}

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
            value={searchable ? proxyValue : ''}
            onClick={onClick}
            autoCapitalize="none"
            autoComplete="one-time-code"
            autoCorrect="off"
            spellCheck="false"
            disabled={disabled}
          />

          {!searchable && (
            <span className="o-select-input o-select-input-text" onClick={onClick}>
              {multiple ? '' : proxyValue || ''}
            </span>
          )}
        </div>
      </div>
      {!multiple && nullable && value && !disabled && (
        <div className="o-select-remover" onClick={onNullify}>
          &#10006;
        </div>
      )}
      <IconComponent onClick={onIconClick} open={open} loading={loading} fetching={fetching} />
    </div>
  );
};

SelectInputComponent.displayName = 'SelectInput';

// export default SelectInputComponent;

export default React.forwardRef<HTMLDivElement, any>(SelectInputComponent);

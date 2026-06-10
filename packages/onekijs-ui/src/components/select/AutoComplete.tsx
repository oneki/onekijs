import { Primitive } from 'onekijs-framework';
import React from 'react';
import Select from '.';
import FormSelect from './FormSelect';
import { AutoCompleteProps, FormAutoCompleteProps, SelectController, SelectItem, SelectState } from './typings';
import { defaultAutocompleteAdapter, numberAutocompleteAdapter } from './util';

const AutoComplete = <
  T = Primitive,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
  C extends SelectController<T, I, S> = SelectController<T, I, S>,
>(
  props: AutoCompleteProps<T, I, S, C>,
) => {
  const adapter = props.type === 'number' ? numberAutocompleteAdapter : defaultAutocompleteAdapter;
  return (
    <Select
      NotFoundComponent={null}
      IconComponent={null}
      autoCompleteAdapter={adapter}
      openOnFocus={true}
      {...props}
      mode="autocomplete"
      autoCompleteSearch={false}
      validateValue={false}
      searchable={true}
      clickable={false}

    />
  );
};

export const FormAutoComplete = <T extends Primitive = Primitive, I extends SelectItem<T> = SelectItem<T>>(
  props: FormAutoCompleteProps<T, I>,
) => {
  const adapter = props.type === 'number' ? numberAutocompleteAdapter : defaultAutocompleteAdapter;
  return (
    <FormSelect
      NotFoundComponent={null}
      IconComponent={null}
      autoCompleteAdapter={adapter}
      openOnFocus={true}
      {...props}
      mode="autocomplete"
      autoCompleteSearch={false}
      validateValue={false}
      searchable={true}
      clickable={false}
    />
  );
};

export default AutoComplete;

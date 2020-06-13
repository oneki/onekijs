import React from "react";
import PropTypes from 'prop-types'
import { useField } from "../form";
import { extractValidators } from "../utils/form";

export const Input = React.memo((props) => {
  const [validators, extraProps] = extractValidators(props);
  // eslint-disable-next-line react/prop-types
  const { validation, ...field } = useField(props.name, validators, {
    defaultValue: ''
  });
  return (
    <>
      <input {...extraProps} {...field} /> {validation.status} :{" "}
      {validation.message}
    </>
  );
});

Input.propTypes = {
  props: PropTypes.object,
}

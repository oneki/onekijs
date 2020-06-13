import React from "react";
import { useField } from "../form";
import { extractValidators } from "../utils/form";

export const Input = React.memo((props) => {
  const [validators, extraProps] = extractValidators(props);
  const { validation, ...field } = useField(props.name, validators, {
    defaultValue: ''
  });
  console.log('render input', props.name);
  return (
    <>
      <input {...extraProps} {...field} /> {validation.status} :{" "}
      {validation.message}
    </>
  );
});

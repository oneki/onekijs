import { FormDisplayerProps } from 'onekijs-framework';
import { addClassname } from '../../../utils/style';
import React from 'react';

export const FormCardDisplayerComponent = (displayerProps: FormDisplayerProps) => {
  const total = Object.values(displayerProps.children ?? {}).length
  return (
    <div className={addClassname('o-displayer-card', displayerProps.className)}>
      <div className="o-displayer-card-title">{displayerProps.name}</div>
      {Object.values(displayerProps.children ?? {}).map((field, index) => {
        const Displayer = field.Displayer;
        return <Displayer {...field} index={index} key={`field-${index}`} first={index === 0} last={index === total-1} format={displayerProps.format} />;
      })}
    </div>
  );
};

export default FormCardDisplayerComponent;

import { useForm } from 'onekijs-framework';
import React from 'react';
import Accordion from '../../accordion';
import { StylableProps } from '../../../styles/typings';

const WizardSummaryComponent: React.FC<StylableProps> = ({className}) => {
  const form = useForm();
  const tree = Object.values(form.getDisplayerTree());
  return (
    <Accordion className={className}>
      {tree.map((field, index) => {
        const Displayer = field.Displayer;
        return <Displayer {...field} index={index} key={`field-${index}`} first={index === 0} last={index === tree.length -1} format="form_summary" />;
      })}
    </Accordion>
  );
};

export default WizardSummaryComponent;

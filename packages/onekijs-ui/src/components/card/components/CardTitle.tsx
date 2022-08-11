import React from 'react';
import TogglerIcon from '../../icon/TogglerIcon';
import { CardTitleProps } from '../typings';

const CardTitle: React.FC<CardTitleProps> = ({ collapsable = true, open, title, onToggle }) => {
  return (
    <div className="o-card-title-container" onClick={onToggle}>
      {collapsable && <TogglerIcon open={open} />}
      <span className="o-card-title">{title}</span>
    </div>
  );
};

export default CardTitle;

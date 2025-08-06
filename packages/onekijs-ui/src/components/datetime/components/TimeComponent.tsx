import React from 'react';
import { TimeComponentProps } from '../typings';
import { addClassname } from '../../../utils/style';
import Select from '../../select';

const TimeComponent: React.FC<TimeComponentProps> = ({ hour: externalHour, minute: externalMinute, className }) => {
  const hour = isNaN(parseInt(`${externalHour}`)) ? 0 : parseInt(`${externalHour}`);
  const minute = isNaN(parseInt(`${externalMinute}`)) ? 0 : parseInt(`${externalMinute}`);
  return (
    <div className={addClassname('o-time-container', className)}>
      <Select nullable={false} value={hour} size="large" dataSource={[...Array(24).keys()]} /> : <Select nullable={false} value={minute} size="large" dataSource={[...Array(60).keys()]} />
    </div>
  )

}

export default TimeComponent;

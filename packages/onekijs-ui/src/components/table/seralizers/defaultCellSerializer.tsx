import { get } from 'onekijs-framework';
import { TableCellSerializer } from '../typings';

const defaultCellSerializer: TableCellSerializer<any, any> = (data, column) => {
  const value = get(data, column.id, undefined);
  if (value === undefined || value === null) return null;
  if (!isNaN(value) || value === true || value === false) return value;
  return `${value}`
}

export default defaultCellSerializer;

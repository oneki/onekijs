import { get } from 'onekijs-framework';
import { TableCellSerializer } from '../typings';

const defaultCellSerializer: TableCellSerializer<any, any> = (data, column) => {
  return get(data, column.id, null);
}

export default defaultCellSerializer;

import { ListItemAdapter } from './typings';

export const defaultItemAdapter: ListItemAdapter = (item) => {
  return {
    id: item.id,
    text: item.text
  }
}
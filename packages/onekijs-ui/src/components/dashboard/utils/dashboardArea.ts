import { DashboardArea } from '../typings';

export const isAreaInColumn = (column: 'first' | 'last', area: DashboardArea, areas?: DashboardArea[][]): boolean => {
  if (!areas) return false;

  for (const row of areas) {
    const index = column === 'first' ? 0 : row.length - 1;
    if (row[index] === area) {
      return true;
    }
  }

  return false;
};

export const isAreaInRow = (row: 'first' | 'last', area: DashboardArea, areas?: DashboardArea[][]): boolean => {
  if (!areas) return false;
  const index = row === 'first' ? 0 : areas.length - 1;

  for (const cell of areas[index]) {
    if (cell === area) {
      return true;
    }
  }

  return false;
};

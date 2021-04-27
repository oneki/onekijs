import { GridSize } from "../styles/typings";

export const calcSize = (size: string, fn: (size: number) => number): string => {
  const sizeNumber = parseFloat(size)
  const unit = size.substr(`${sizeNumber}`.length)
  const nextNumber = fn(sizeNumber);
  return `${nextNumber}${unit}`;
};

export const gridSize = (size: GridSize): string => {
  return `${(100/12) * size}%`
}
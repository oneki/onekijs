import { ProductType } from './product';

export interface CartType {
  products: ProductType[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartResponse extends CartType {}

/* eslint-disable @typescript-eslint/no-empty-interface */
import { CartType } from './cart';

export interface ProductType {
  name: string;
  price: number;
  description?: string;
}

export interface AddProductRequest extends ProductType {}
export interface AddProductResponse extends CartType {}

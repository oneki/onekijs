export interface ProductType {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export const products: ProductType[] = [
  {
    id: 0,
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
  },
  {
    id: 1,
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
  },
  {
    id: 2,
    name: 'Phone Invalid',
    price: 299,
    description: '',
  },
];

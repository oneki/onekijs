import React, { FC } from 'react';
import { useLocalService, useTranslation } from 'onekijs-next';
import { ProductType } from '../../../../data/products';
import { currency } from '../../core/libs/format';
import AvailabilityService, { AvailabilityState } from '../services/AvailabilityService';

interface ProductDetailsProps {
  product: ProductType;
  onBuy: () => void;
}

const initialAvailabilityState: AvailabilityState = {
  loading: false,
};

const ProductDetails: FC<ProductDetailsProps> = ({ product, onBuy }) => {
  const [T] = useTranslation();
  const [availability, availabilityService] = useLocalService(AvailabilityService, initialAvailabilityState);
  return (
    <div>
      <h2>
        <T>Product Details</T>
      </h2>

      <div>
        <h3>
          <T>{product.name}</T>
        </h3>
        <h4>
          <T>{currency(product.price)}</T>
        </h4>
        {product.description && (
          <p>
            <T>{product.description}</T>
          </p>
        )}
        <p>
          <button onClick={onBuy}>
            <T>Buy</T>
          </button>
        </p>
        <p>
          <button onClick={() => availabilityService.checkAvailability(product.id)} disabled={availability.loading}>
            <T>Check availability</T>
          </button>
          <span className="availability">
            {availability.loading && (
              <span>
                <T>Loading</T> ...
              </span>
            )}
            {!availability.loading && availability.available === true && (
              <span className="available">
                <T>The product is available</T>
              </span>
            )}
            {!availability.loading && availability.available === false && (
              <span className="not-available">
                <T>The product is not available</T>
              </span>
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

import { NO_EXPIRATION, useCache } from 'onekijs';
import React, { FC } from 'react';
import { URL_PRODUCT } from '../../modules/core/libs/constants';
import Product from '../../modules/products/components/Product';
import { ProductsResponse } from '../../__server__/api/dto/product';

const ProductsPage: FC = () => {
  // perform an AJAX GET request and cache the response
  // the response looks like this:
  // {
  //   "products": [{...}]
  // }
  const [cache, loading] = useCache<ProductsResponse>(URL_PRODUCT, {
    // if ttl is not passed, the value in HTTP header response 'cache-control' is used (default: no cache)
    ttl: NO_EXPIRATION, // The validity time of the cache in seconds (NO_EXPIRATION means infinite)
  });
  if (loading) {
    return null;
  }
  return (
    <div>
      <h2>Products</h2>
      {cache?.products &&
        cache.products.map((product, index) => (
          <Product
            key={product.name}
            product={product}
            id={index}
            onClick={() => window.alert('The product has been shared!')}
            onNotify={() => window.alert('You will be notified when the product goes on sale')}
          />
        ))}
    </div>
  );
};

export default ProductsPage;

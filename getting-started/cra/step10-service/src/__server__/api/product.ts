import { RequestHandler, rest } from 'msw';
import { AvailabilityResponse } from './dto/product';

// The cart is stored in the session storage of the browser
// We can do that because we mock a server in the browser
const productAvailabilityHandler = rest.get<AvailabilityResponse>(
  '/products/:productId/availability',
  async (req, res, ctx) => {
    const { productId } = req.params;
    if (productId === '2') {
      return res(
        ctx.delay(500),
        ctx.status(500),
        ctx.json({
          message: 'SQL exception while retrieving the availability of the product',
        } as any),
      );
    }
    const available = productId === '1' ? false : true;
    return res(
      ctx.delay(500),
      ctx.json({
        available,
      }),
    );
  },
);

const productHandlers = (): RequestHandler[] => {
  return [productAvailabilityHandler];
};

export default productHandlers;

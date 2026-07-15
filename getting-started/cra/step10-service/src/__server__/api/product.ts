import { HttpHandler, HttpResponse, delay, http } from 'msw';
import { AvailabilityResponse } from './dto/product';

// The cart is stored in the session storage of the browser
// We can do that because we mock a server in the browser
const productAvailabilityHandler = http.get('/products/:productId/availability', async ({ params }) => {
  const productId = params.productId;
  await delay(500);
  if (productId === '2') {
    return HttpResponse.json(
      { message: 'SQL exception while retrieving the availability of the product' },
      { status: 500 },
    );
  }
  const available = productId === '1' ? false : true;
  return HttpResponse.json({ available } satisfies AvailabilityResponse);
});

const productHandlers = (): HttpHandler[] => {
  return [productAvailabilityHandler];
};

export default productHandlers;

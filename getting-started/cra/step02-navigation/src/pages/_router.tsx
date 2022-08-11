import { Navigate, Route, Routes } from 'onekijs';
import AppLayout from '../modules/core/layouts/AppLayout';
import ProductsRouter from './products/_router';

const RootRouter = (): JSX.Element => {
  return (
    <AppLayout>
      {/* AppLayout is a layout common to all pages */}
      <Routes>
        {/* all routes starting with /products are defined in src/products/@router.tsx */}
        <Route path="/products/*" element={<ProductsRouter />} />
        {/* redirect by default to /products as we don't have any homepage in this example */}
        <Route index element={<Navigate to="/products" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default RootRouter;

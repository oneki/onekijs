import { Route, Routes } from 'onekijs';
import UseGlobalStatePage from './UseGlobalStatePage';
import UseGlobalPropPage from './UseGlobalPropPage';
import StateManagementIndexPage from './IndexPage';
import UseLocalServicePage from './UseLocalServicePage';


const StateManagementRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="use-global-state" element={<UseGlobalStatePage />} />
      <Route path="use-global-prop" element={<UseGlobalPropPage />} />
      <Route path="use-local-service" element={<UseLocalServicePage />} />
      <Route index element={<StateManagementIndexPage />} />
    </Routes>
  );
};

export default StateManagementRouter;

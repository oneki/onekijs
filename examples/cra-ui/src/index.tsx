import { App, Link, Route, Routes } from 'onekijs';
import { ClarityTheme } from 'onekijs-ui';
import { createRoot } from 'react-dom/client';
import { AccordionPage } from './pages/accordion';
import { AjaxListPage } from './pages/ajaxList';
import { ButtonPage } from './pages/button';
import { CardPage } from './pages/card';
import { CheckboxPage } from './pages/checkbox';
import { DashboardPage } from './pages/dashboard';
import { GridPage } from './pages/grid';
import { InputPage } from './pages/input';
import { ListPage } from './pages/list';
import { PropertiesPage } from './pages/properties';
import { SelectPage } from './pages/select';
import { TabsPage } from './pages/tab';
import { TablePage } from './pages/table';
import { TreePage } from './pages/tree';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <App>
    <ClarityTheme>
      <div
        style={{
          backgroundColor: 'hsl(198, 0%, 98%)',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            backgroundColor: 'hsl(198, 0%, 95%)',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <Link href="/">Home</Link> | <Link href="/button">Button</Link> | <Link href="/select">Select</Link> |{' '}
          <Link href="/list">List</Link> | <Link href="/ajaxList">Ajax List</Link> | <Link href="/table">Table</Link> |{' '}
          <Link href="/input">Input</Link> | <Link href="/dashboard">Dashboard</Link> | <Link href="/tree">Tree</Link> |{' '}
          <Link href="/accordion">Accordion</Link> | <Link href="/tab">Tab</Link> | <Link href="/card">Card</Link> |{' '}
          <Link href="/grid">Grid</Link> | <Link href="/properties">Properties</Link> | <Link href="/checkbox">Checkbox</Link>
        </div>
        <div style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <Routes>
            <Route path="/button" element={<ButtonPage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/ajaxList" element={<AjaxListPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="/accordion" element={<AccordionPage />} />
            <Route path="/tab" element={<TabsPage />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/grid" element={<GridPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/checkbox" element={<CheckboxPage />} />
          </Routes>
        </div>
      </div>
    </ClarityTheme>
  </App>,
);

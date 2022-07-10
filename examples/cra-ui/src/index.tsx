import '@fontsource/roboto';
import { App, Link, Route, Routes } from 'onekijs';
import { theme } from 'onekijs-ui';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { AjaxListPage } from './pages/ajaxList';
import { ButtonPage } from './pages/button';
import { DashboardPage } from './pages/dashboard';
import { InputPage } from './pages/input';
import { ListPage } from './pages/list';
import { SelectPage } from './pages/select';
import { TablePage } from './pages/table';
import { TreePage } from './pages/tree';

const customTheme = {};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <App>
    <ThemeProvider theme={theme(customTheme)}>
      <div
        style={{
          fontFamily: 'Roboto',
        }}
      >
        <div
          style={{
            backgroundColor: '#EEE',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <Link href="/">Home</Link> | <Link href="/button">Button</Link> | <Link href="/select">Select</Link> |{' '}
          <Link href="/list">List</Link> | <Link href="/ajaxList">Ajax List</Link> | <Link href="/table">Table</Link> |{' '}
          <Link href="/input">Input</Link> | <Link href="/dashboard">Dashboard</Link> | <Link href="/tree">Tree</Link>
        </div>
        <Routes>
          <Route path="/button" element={<ButtonPage />}/>
          <Route path="/select" element={<SelectPage />}/>
          <Route path="/list" element={<ListPage />}/>
          <Route path="/ajaxList" element={<AjaxListPage />}/>
          <Route path="/table" element={<TablePage />}/>
          <Route path="/input" element={<InputPage />}/>
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/tree" element={<TreePage />}/>
        </Routes>
      </div>
    </ThemeProvider>
  </App>,

);

import { App, Link, Route, Routes } from 'onekijs';
import { ClarityTheme } from 'onekijs-theme-clarity';
import { createRoot } from 'react-dom/client';
import { AccordionPage } from './pages/accordion';
import { ActionMenuPage } from './pages/actionmenu';
import { AjaxListPage } from './pages/ajaxList';
import { ButtonPage } from './pages/button';
import { CardPage } from './pages/card';
import { CheckboxPage } from './pages/checkbox';
import { DashboardPage } from './pages/dashboard';
import { FormPage } from './pages/form';
import { GridPage } from './pages/grid';
import { InputPage } from './pages/input';
import { ListPage } from './pages/list';
import { ModalPage } from './pages/modal';
import { NotificationsPage } from './pages/notifications';
import { PropertiesPage } from './pages/properties';
import { SelectPage } from './pages/select';
import { TabsPage } from './pages/tab';
import { TablePage } from './pages/table';
import { TagPage } from './pages/tag';
import { TimerPage } from './pages/timer';
import { TreePage } from './pages/tree';
import { WizardPage } from './pages/wizard';
import UiServicePage from './pages/service';
import { AlertPage } from './pages/alert';
import { SliderPage } from './pages/slider';
import { DatetimePage } from './pages/datetime';

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
          <Link href="/grid">Grid</Link> | <Link href="/properties">Properties</Link> |{' '}
          <Link href="/checkbox">Checkbox</Link> | <Link href="/tag">Tag</Link> | <Link href="/modal">Modal</Link> |{' '}
          <Link href="/wizard">Wizard</Link> | <Link href="/form">Form</Link> |{' '}
          <Link href="/actionmenu">Action Menu</Link> | <Link href="/notifications">Notifications</Link> |{' '}
          <Link href="/timer">Timer</Link> | <Link href="/service">Service</Link> | <Link href="/alert">Alert</Link>  | <Link href="/datetime">DateTime</Link>
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
            <Route path="/tag" element={<TagPage />} />
            <Route path="/modal" element={<ModalPage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/actionmenu" element={<ActionMenuPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/service" element={<UiServicePage />} />
            <Route path="/alert" element={<AlertPage />} />
            <Route path="/slider" element={<SliderPage />} />
            <Route path="/datetime" element={<DatetimePage />} />
          </Routes>
        </div>
      </div>
    </ClarityTheme>
  </App>,
);

import { Link, Outlet } from 'onekijs';
import { FC } from 'react';
import { ClarityTheme } from 'onekijs-theme-clarity';

const sections: Record<string, string> = {
  "Home": "/",
  "Settings": "/settings",
  "State management": "/state-management",
  "Security": "/auth",
  "UI": "/ui"
}

const AppLayout: FC = () => {
  return (
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
          {Object.keys(sections).map((k, i) => (
            <span key={k}>
              {i > 0 && <span> | </span>}
              <Link href={sections[k]}>{k}</Link>
            </span>
          ))}
        </div>
        <div style={{ paddingLeft: '20px', paddingRight: '10px' }}>
          <Outlet />
        </div>
      </div>
    </ClarityTheme>
  );
};

export default AppLayout;

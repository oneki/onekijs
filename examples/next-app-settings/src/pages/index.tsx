import { useSettings, useSetting } from 'onekijs-next';
import React, { FC } from 'react';

const IndexPage: FC = () => {
  const settings = useSettings();
  const serverUrl = useSetting('server.baseUrl');
  return (
    <div>
      <h2>All settings:</h2>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
      <h2>Server base URL</h2>
      <p>{serverUrl}</p>
    </div>
  );
};

export default IndexPage;

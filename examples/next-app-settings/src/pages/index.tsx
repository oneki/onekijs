import { useSetting, useSettings } from 'onekijs-next';
import React, { FC } from 'react';

const IndexPage: FC = () => {
  const settings = useSettings(); // select the full configuration object
  const baseUrl = useSetting('server.baseUrl'); // select a specific entry in the configuration object
  return (
    <div>
      <h2>Whole config object</h2>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
      <h2>Base URL</h2>
      <p>the base url is: {baseUrl}</p>
    </div>
  );
};

export default IndexPage;

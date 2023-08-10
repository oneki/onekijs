import { useSettings } from 'onekijs';
import { FC } from 'react'

const UseSettingsPage: FC = () => {
  const settings = useSettings();
  return (
    <div>
      <h2>All settings:</h2>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}

export default UseSettingsPage;
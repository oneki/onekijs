import { AppSettings } from 'onekijs-next';

export interface Settings extends AppSettings {
  loadingDelay: number;
  server: {
    baseUrl: string;
  };
}
export const settings: Settings = {
  loadingDelay: 1500,
  server: {
    baseUrl: 'https://example.com/api',
  },
};

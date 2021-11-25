import { AppSettings } from 'onekijs-next';

export interface Settings extends AppSettings {
  loadingDelay: number;
}
export const settings: Settings = {
  loadingDelay: 1500,
};

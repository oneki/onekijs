export interface NotificationContent {
  payload?: any;
  id?: string | number;
  topic?: string;
  timestamp?: number;
  ttl?: number;
  persist?: boolean;
}

export interface Notification {
  payload: any;
  id: string | number;
  topic: string;
  timestamp: number;
  expires: number | null;
  persist: boolean;
  ttl?: number;
  remove: () => void;
}

export enum NotificationLevel {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
  Success = 'success',
}

export type Saga<Args extends any[] = any[]> = (...args: Args) => Iterator<any>;
export enum SagaEffect {
  Latest = 'latest',
  Every = 'every',
  Leading = 'leading',
  Throttle = 'throttle',
  Debounce = 'debounce',
  Serial = 'serial',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}
export interface AnyState extends State {
  [k: string]: any;
}

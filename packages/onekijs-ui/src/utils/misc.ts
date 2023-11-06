import { ucfirst } from 'onekijs-framework'

export const titlelize = (value: string): string => {
  return value.split('_').map((v) => ucfirst(v)).join(' ');
}

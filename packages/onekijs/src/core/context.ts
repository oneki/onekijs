import React from 'react';
import { AppContext } from '../types/app';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DefaultAppContext = React.createContext<AppContext>(null!);

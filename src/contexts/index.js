import React from 'react';
import { initialState } from './reducer';

const StoreContext = React.createContext(initialState);
const DispatchContext = React.createContext(null);

export {
  StoreContext,
  DispatchContext,
};
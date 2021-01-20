// tslint:disable: no-empty
import React from 'react';
import { Vehicle } from '../util/EntityInterfaces';

const typedVehicles: Vehicle[] = [];
const defaultValue: any = '';

export const AppContext = React.createContext({
  darkMode: true,
  reloadAll: () => {},
  reloadVehicles: () => {},
  toggleDarkMode: () => {},
  vehicles: typedVehicles,
});

export const LoginContext = React.createContext({
  open: defaultValue,
});

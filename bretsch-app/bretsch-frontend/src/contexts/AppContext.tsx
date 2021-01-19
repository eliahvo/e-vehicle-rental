// tslint:disable: no-empty
import React from 'react';
import { Vehicle } from '../util/EntityInterfaces';

const typedVehicles: Vehicle[] = [];

export const AppContext = React.createContext({
  darkMode: true,
  reloadVehicles: () => {},
  toggleDarkMode: () => {},
  vehicleData: typedVehicles,
});

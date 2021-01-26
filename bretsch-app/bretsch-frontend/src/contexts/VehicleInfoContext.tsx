import React from 'react';

export const VehicleInfoContext = React.createContext({
  open: false,
  // tslint:disable-next-line: no-empty
  toggleOpen: () => {},
  vehicleId: -1,
});

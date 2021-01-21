import React from "react";

export const VehicleInfoContext = React.createContext({
  toggleOpen: () => {},
  open: false,
  vehicleId: -1,
});

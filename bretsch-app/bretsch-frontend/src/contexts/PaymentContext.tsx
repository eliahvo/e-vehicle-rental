import React from 'react';

export const PaymentContext = React.createContext({
  open: false,
  // tslint:disable-next-line: no-empty
  toggleOpen: () => {},
});
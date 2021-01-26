import React from 'react';

export const LoginContext = React.createContext({
  open: false,
  // tslint:disable-next-line: no-empty
  toggleOpen: () => {},
});

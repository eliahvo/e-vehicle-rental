import React from 'react';

export const RegisterContext = React.createContext({
  open: false,
  // tslint:disable-next-line: no-empty
  toggleOpen: () => {},
});

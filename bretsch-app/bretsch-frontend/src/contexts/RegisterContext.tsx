import React from 'react';

export const RegisterContext = React.createContext({
  email: '',
  open: false,
  // tslint:disable-next-line: no-empty
  toggleOpen: () => {},
});

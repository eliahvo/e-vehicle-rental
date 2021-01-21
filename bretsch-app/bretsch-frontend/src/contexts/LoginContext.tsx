import React from 'react';

export const LoginContext = React.createContext({
  toggleOpen: () => {},
  open: false,
});

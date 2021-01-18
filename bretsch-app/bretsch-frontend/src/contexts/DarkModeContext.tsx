import React from 'react';

export const DarkModeContext = React.createContext({
  darkMode: true,
  // tslint:disable-next-line: no-empty
  toggleDarkMode: () => {},
});

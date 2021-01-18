import 'fontsource-roboto';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { DashboardPage } from './pages/Dashboard/DashboardPage';



export const App = () => {
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <SnackbarProvider maxSnack={10}>
        <CssBaseline />
          <BrowserRouter>
            <Switch>
              <Route path="/" component={DashboardPage} />
            </Switch>
          </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

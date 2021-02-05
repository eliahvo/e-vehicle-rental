import 'fontsource-roboto';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AppContext } from './contexts/AppContext';
import useLocalStorage from './util/LocalStorageHook';
import { Vehicle } from './util/EntityInterfaces';
import { fetchVehicles } from './util/RequestHelper';
import { useSnackbar } from 'notistack';
import { BookingPage } from './pages/Booking/BookingPage';
import { PricePage } from './pages/Prices/PricesPage';
import { SettingPage } from './pages/Settings/SettingPage';
import { MyBookingPage } from './pages/MyBookings/MyBookingPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { authContext, AuthProvider } from './contexts/AuthenticationContext';
import { LoginContext } from './contexts/LoginContext';
import { AdminPage } from './pages/Admin/AdminPage';
import RegisterModal from './components/Register';
import { SocketclientContext } from './contexts/SocketclientContext';

const verifyAuthenticationHandler = (): Boolean => {
  const loginContext = useContext(LoginContext);
  const {
    token,
    actions: { getTokenData, logout },
  } = useContext(authContext);
  if (token !== null) {
    const tokenData = getTokenData();
    if (tokenData !== null) {
      const { exp } = tokenData;
      if (parseInt(exp, 10) * 1000 > Date.now()) {
        return true;
      }
      logout();
      return false;
    }
  }
  loginContext.toggleOpen();
  return false;
};

export const BasePage = () => {
  return <Redirect to="/dashboard" />;
};

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...routeProps }) => {
  if (verifyAuthenticationHandler()) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/" />;
};

export const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [darkModeState, setDarkModeState] = useLocalStorage('App.darkModeState', true);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [socketclient, setSocketclient] = React.useState(null);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiTypography: {
            root: {
              wordBreak: 'break-all',
            },
          },
        },
        palette: {
          primary: {
            main: '#5CE533',
          },
          type: darkModeState ? 'dark' : 'light',
        },
      }),
    [darkModeState],
  );

  useEffect(() => {
    (async () => {
      await loadAll();
    })();
  }, []);

  const loadVehicles = async () => {
    const fetchedData: Vehicle[] = await fetchVehicles();
    if (fetchedData.length !== 0) {
      setVehicleData(fetchedData);
    } else {
      enqueueSnackbar(`Error while fetching vehicle data!`, {
        variant: 'error',
      });
    }
  };

  const loadAll = async () => {
    await loadVehicles();
  };

  const toggleDarkModeState = () => {
    setDarkModeState(!darkModeState);
  };

  const toggleOpenState = () => {
    setOpenLogin(!openLogin);
  };

  const loginContext = {
    open: openLogin,
    toggleOpen: toggleOpenState,
  };

  const context = {
    verifyAuthentication: verifyAuthenticationHandler,
    darkMode: darkModeState,
    reloadAll: loadAll,
    reloadVehicles: loadVehicles,
    toggleDarkMode: toggleDarkModeState,
    vehicles: vehicleData,
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <SocketclientContext.Provider value={[socketclient, setSocketclient]}>
          <AppContext.Provider value={context}>
            <LoginContext.Provider value={loginContext}>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/admin" component={AdminPage} />
                  <Route exact path="/dashboard" component={DashboardPage} />
                  <AuthenticatedRoute exact path="/booking" component={BookingPage} />
                  <Route exact path="/prices" component={PricePage} />
                  <AuthenticatedRoute exact path="/profile" component={ProfilePage} />
                  <AuthenticatedRoute exact path="/my-bookings" component={MyBookingPage} />
                  <AuthenticatedRoute exact path="/settings" component={SettingPage} />
                  <Route path="/" component={BasePage} />
                </Switch>
              </BrowserRouter>
            </LoginContext.Provider>
          </AppContext.Provider>
        </SocketclientContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  );
};

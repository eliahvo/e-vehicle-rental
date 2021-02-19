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
import { MyBookingPage } from './pages/MyBookings/MyBookingPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { authContext, AuthProvider } from './contexts/AuthenticationContext';
import { LoginContext } from './contexts/LoginContext';
import { AdminPage } from './pages/Admin/AdminPage';
import io from 'socket.io-client';
import { SocketclientContext } from './contexts/SocketclientContext';

const permittedRoles = ['admin']; // Have to be lowercase only!

export const verifyAuthentication = (login, auth, suppressLogin = false): boolean => {
  if (auth.token !== null) {
    const tokenData = auth.actions.getTokenData();
    if (tokenData !== null) {
      const { exp } = tokenData;
      if (parseInt(exp, 10) * 1000 > Date.now()) {
        return true;
      }
      auth.actions.logout();
      return false;
    }
  }
  if (!suppressLogin) {
    login.toggleOpen();
  }
  return false;
};

export const verifyPermittedRole = (login, auth, suppressLogin = false): boolean => {
  if (
    verifyAuthentication(login, auth, suppressLogin) &&
    permittedRoles.includes(auth.actions.getTokenData().role.toLowerCase())
  ) {
    return true;
  }
  return false;
};

export const BasePage = () => {
  return <Redirect to="/dashboard" />;
};

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...routeProps }) => {
  const login = useContext(LoginContext);
  const auth = useContext(authContext);
  if (verifyAuthentication(login, auth)) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/" />;
};
const PermittedRolesRoute: React.FC<RouteProps> = ({ children, ...routeProps }) => {
  const login = useContext(LoginContext);
  const auth = useContext(authContext);
  if (verifyPermittedRole(login, auth)) {
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
  const [openCheckedDialog, setOpenCheckedDialog] = React.useState(false);

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
      /* setup socket.io-client */
      setSocketclient(
        io(`http://${window.location.host}:5000`, { transports: ['websocket', 'polling', 'flashsocket'] }),
      );
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

  const toggleOpenCheckedDialog = async () => {
    setOpenCheckedDialog(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOpenCheckedDialog(false);
  };

  const loginContext = {
    open: openLogin,
    toggleOpen: toggleOpenState,
  };

  const context = {
    darkMode: darkModeState,
    reloadAll: loadAll,
    reloadVehicles: loadVehicles,
    toggleDarkMode: toggleDarkModeState,
    vehicles: vehicleData,
    toggleCheckDialog: toggleOpenCheckedDialog,
    checkDialog: openCheckedDialog,
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
                  <Route exact path="/dashboard" component={DashboardPage} />
                  <AuthenticatedRoute exact path="/booking" component={BookingPage} />
                  <Route exact path="/prices" component={PricePage} />
                  <AuthenticatedRoute exact path="/profile" component={ProfilePage} />
                  <AuthenticatedRoute exact path="/my-bookings" component={MyBookingPage} />
                  <PermittedRolesRoute exact path="/admin" component={AdminPage} />
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
